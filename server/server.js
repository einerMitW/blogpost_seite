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

let adminHash = '';
if (process.env.ADMIN_PASSWORD) {
    adminHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
}

// Middleware for authentication
const authenticate = (req, res, next) => {
    const sessionToken = req.cookies.admin_session;
    if (sessionToken && sessionToken === process.env.SESSION_SECRET) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// API Routes
app.post('/api/login', async (req, res) => {
    const { password } = req.body;
    if (!password || !adminHash) return res.status(401).json({ error: 'Unauthorized' });
    
    const match = await bcrypt.compare(password, adminHash);
    if (match) {
        const token = process.env.SESSION_SECRET || 'super-secret-default-token';
        res.cookie('admin_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('admin_session');
    res.json({ success: true });
});

// Check auth status
app.get('/api/auth/status', (req, res) => {
    const sessionToken = req.cookies.admin_session;
    if (sessionToken && sessionToken === process.env.SESSION_SECRET) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

// Get all essays
app.get('/api/essays', (req, res) => {
    try {
        const essays = db.prepare('SELECT id, title, tags, read_time, created_at FROM essays ORDER BY created_at DESC').all();
        res.json(essays);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single essay
app.get('/api/essays/:id', (req, res) => {
    try {
        const essay = db.prepare('SELECT * FROM essays WHERE id = ?').get(req.params.id);
        if (!essay) return res.status(404).json({ error: 'Essay not found' });
        res.json(essay);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create essay (protected)
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

// Delete essay (protected)
app.delete('/api/essays/:id', authenticate, (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM essays WHERE id = ?');
        stmt.run(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
