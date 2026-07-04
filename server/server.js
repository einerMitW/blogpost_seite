/**
 * @file server.js
 * @description Main entry point for the backend server, exposing REST API endpoints for essays.
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

let admin_hash = '';
if (process.env.ADMIN_PASSWORD) {
	admin_hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
}

/**
 * Writes an audit message to the audit log file.
 * @param {string} message - The audit log message.
 * @returns {void}
 */
const write_audit_log = (message) => {
	const log_dir = path.join(__dirname, '../data');
	if (!fs.existsSync(log_dir)) {
		fs.mkdirSync(log_dir, { recursive: true });
	}
	const log_path = path.join(log_dir, 'audit.log');
	const timestamp = new Date().toISOString();
	fs.appendFileSync(log_path, `[AUDIT] [${timestamp}] ${message}\n`);
};

/**
 * Middleware to validate the payload of a new essay.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @returns {void}
 */
const validate_essay_payload = (req, res, next) => {
	const { title, content, tags, read_time } = req.body;

	if (typeof title !== 'string' || title.length < 3 || title.length > 100) {
		return res.status(400).json({ error: 'Title must be a string between 3 and 100 characters.' });
	}

	if (typeof content !== 'string' || content.length < 10 || content.length > 50000) {
		return res.status(400).json({ error: 'Content must be a string between 10 and 50000 characters.' });
	}

	if (tags !== undefined) {
		if (Array.isArray(tags)) {
			const invalid_tag = tags.some(t => typeof t !== 'string');
			if (invalid_tag) {
				return res.status(400).json({ error: 'All tags in the array must be strings.' });
			}
			const joined = tags.join(', ');
			if (joined.length > 200) {
				return res.status(400).json({ error: 'Tags length cannot exceed 200 characters.' });
			}
		} else if (typeof tags !== 'string') {
			return res.status(400).json({ error: 'Tags must be either a string or an array of strings.' });
		} else if (tags.length > 200) {
			return res.status(400).json({ error: 'Tags length cannot exceed 200 characters.' });
		}
	}

	if (read_time !== undefined) {
		const parsed = Number(read_time);
		if (!Number.isInteger(parsed) || parsed < 0 || parsed > 240) {
			return res.status(400).json({ error: 'Read time must be an integer between 0 and 240 minutes.' });
		}
	}

	next();
};

/**
 * Rate limiter middleware config for login attempts.
 */
const login_limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	message: { error: 'Too many login attempts, please try again after 15 minutes' },
	standardHeaders: true,
	legacyHeaders: false
});

/**
 * Middleware to authenticate requests checking the admin session.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
const authenticate = (req, res, next) => {
	const session_token = req.cookies.admin_session;
	if (session_token && session_token === process.env.SESSION_SECRET) {
		next();
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
};

// API Routes

/**
 * Authenticates the admin and sets a session cookie.
 * @route POST /api/login
 */
app.post('/api/login', login_limiter, async (req, res) => {
	const { password } = req.body;
	if (!password || !admin_hash) {
		write_audit_log('Login failed: Missing password or unconfigured hash');
		return res.status(401).json({ error: 'Unauthorized' });
	}
	
	const match = await bcrypt.compare(password, admin_hash);
	if (match) {
		const token = process.env.SESSION_SECRET || 'super-secret-default-token';
		res.cookie('admin_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
		write_audit_log('Login successful');
		res.json({ success: true });
	} else {
		write_audit_log('Login failed: Invalid credentials');
		res.status(401).json({ error: 'Unauthorized' });
	}
});

/**
 * Logs out the admin by clearing the session cookie.
 * @route POST /api/logout
 */
app.post('/api/logout', (req, res) => {
	res.clearCookie('admin_session');
	write_audit_log('Logout successful');
	res.json({ success: true });
});

/**
 * Checks the current authentication status.
 * @route GET /api/auth/status
 */
app.get('/api/auth/status', (req, res) => {
	const session_token = req.cookies.admin_session;
	if (session_token && session_token === process.env.SESSION_SECRET) {
		res.json({ authenticated: true });
	} else {
		res.json({ authenticated: false });
	}
});

/**
 * Retrieves all essays, including content, ordered by creation date descending.
 * @route GET /api/essays
 */
app.get('/api/essays', (req, res) => {
	try {
		const essays = db.prepare('SELECT id, title, content, tags, read_time, created_at FROM essays ORDER BY created_at DESC').all();
		res.json(essays);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

/**
 * Retrieves a single essay by ID.
 * @route GET /api/essays/:id
 */
app.get('/api/essays/:id', (req, res) => {
	try {
		const essay = db.prepare('SELECT * FROM essays WHERE id = ?').get(req.params.id);
		if (!essay) return res.status(404).json({ error: 'Essay not found' });
		res.json(essay);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

/**
 * Creates a new essay. Protected endpoint.
 * @route POST /api/essays
 */
app.post('/api/essays', authenticate, validate_essay_payload, (req, res) => {
	const { title, content, tags, read_time } = req.body;
	
	try {
		const tags_string = Array.isArray(tags) ? tags.join(', ') : (tags || '');
		const stmt = db.prepare('INSERT INTO essays (title, content, tags, read_time) VALUES (?, ?, ?, ?)');
		const result = stmt.run(title, content, tags_string, read_time || 0);
		write_audit_log(`Essay created with ID: ${result.lastInsertRowid}`);
		res.status(201).json({ id: result.lastInsertRowid });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

/**
 * Deletes an essay by ID. Protected endpoint.
 * @route DELETE /api/essays/:id
 */
app.delete('/api/essays/:id', authenticate, (req, res) => {
	try {
		const stmt = db.prepare('DELETE FROM essays WHERE id = ?');
		stmt.run(req.params.id);
		write_audit_log(`Essay deleted with ID: ${req.params.id}`);
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Avoid listening if imported for testing
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

module.exports = app;