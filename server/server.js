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
app.post('/api/login', async (req, res) => {
	const { password } = req.body;
	if (!password || !admin_hash) return res.status(401).json({ error: 'Unauthorized' });
	
	const match = await bcrypt.compare(password, admin_hash);
	if (match) {
		const token = process.env.SESSION_SECRET || 'super-secret-default-token';
		res.cookie('admin_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
		res.json({ success: true });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
});

/**
 * Logs out the admin by clearing the session cookie.
 * @route POST /api/logout
 */
app.post('/api/logout', (req, res) => {
	res.clearCookie('admin_session');
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
app.post('/api/essays', authenticate, (req, res) => {
	const { title, content, tags, read_time } = req.body;
	if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
	
	try {
		const stmt = db.prepare('INSERT INTO essays (title, content, tags, read_time) VALUES (?, ?, ?, ?)');
		const result = stmt.run(title, content, tags, read_time || 0);
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