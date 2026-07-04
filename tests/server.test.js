/**
 * @file server.test.js
 * @description Tests server routing, REST endpoints, and authentication.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Set env variable to use in-memory database and test configurations
process.env.NODE_ENV = 'test';
process.env.ADMIN_PASSWORD = 'test_password';
process.env.SESSION_SECRET = 'test_secret';

const app = require('../server/server');
const db = require('../server/db');

let server;
let base_url;

test.before(() => {
	return new Promise((resolve) => {
		server = app.listen(0, () => {
			const { port } = server.address();
			base_url = `http://localhost:${port}`;
			resolve();
		});
	});
});

test.after(() => {
	server.close();
});

test('public endpoint - fetch essays empty list', async (t) => {
	db.prepare('DELETE FROM essays').run();

	const res = await fetch(`${base_url}/api/essays`);
	assert.strictEqual(res.status, 200);

	const data = await res.json();
	assert.ok(Array.isArray(data));
	assert.strictEqual(data.length, 0);
});

test('authentication flow - login with wrong password', async (t) => {
	const res = await fetch(`${base_url}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: 'wrong' })
	});
	assert.strictEqual(res.status, 401);
});

test('authentication flow - login with correct password', async (t) => {
	const res = await fetch(`${base_url}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: 'test_password' })
	});
	assert.strictEqual(res.status, 200);

	const cookies = res.headers.get('set-cookie');
	assert.ok(cookies && cookies.includes('admin_session=test_secret'), 'Should receive admin session cookie');
});

test('essay creation validation - title too short', async (t) => {
	// Login first to get cookie
	const login_res = await fetch(`${base_url}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: 'test_password' })
	});
	const cookie = login_res.headers.get('set-cookie');

	const res = await fetch(`${base_url}/api/essays`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookie
		},
		body: JSON.stringify({
			title: 'Ab',
			content: 'This is a long enough content to pass the length check.',
			tags: 'test',
			read_time: 5
		})
	});
	assert.strictEqual(res.status, 400);
	const data = await res.json();
	assert.ok(data.error.includes('title') || data.error.includes('Title'));
});

test('essay creation validation - title too long', async (t) => {
	const login_res = await fetch(`${base_url}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: 'test_password' })
	});
	const cookie = login_res.headers.get('set-cookie');

	const long_title = 'A'.repeat(101);
	const res = await fetch(`${base_url}/api/essays`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookie
		},
		body: JSON.stringify({
			title: long_title,
			content: 'This is a long enough content to pass the length check.',
			tags: 'test',
			read_time: 5
		})
	});
	assert.strictEqual(res.status, 400);
});

test('essay creation validation - content too short', async (t) => {
	const login_res = await fetch(`${base_url}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: 'test_password' })
	});
	const cookie = login_res.headers.get('set-cookie');

	const res = await fetch(`${base_url}/api/essays`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookie
		},
		body: JSON.stringify({
			title: 'Valid Title',
			content: 'Short',
			tags: 'test',
			read_time: 5
		})
	});
	assert.strictEqual(res.status, 400);
});

test('essay creation validation - invalid read_time', async (t) => {
	const login_res = await fetch(`${base_url}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: 'test_password' })
	});
	const cookie = login_res.headers.get('set-cookie');

	const res = await fetch(`${base_url}/api/essays`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookie
		},
		body: JSON.stringify({
			title: 'Valid Title',
			content: 'This is a long enough content to pass the length check.',
			tags: 'test',
			read_time: 300 // above 240
		})
	});
	assert.strictEqual(res.status, 400);
});

test('audit logging - check audit entries', async (t) => {
	const log_path = path.join(__dirname, '../data/audit.log');
	if (fs.existsSync(log_path)) {
		fs.unlinkSync(log_path);
	}

	// Trigger a logged action (login)
	await fetch(`${base_url}/api/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: 'test_password' })
	});

	assert.ok(fs.existsSync(log_path), 'Audit log file should be created');
	const log_content = fs.readFileSync(log_path, 'utf8');
	assert.ok(log_content.includes('[AUDIT]'), 'Audit log should contain AUDIT entry prefix');
	assert.ok(log_content.includes('login') || log_content.includes('Login'), 'Audit log should contain login attempt message');
});

test('api - get essays list does not contain full content but contains preview', async (t) => {
	// Insert a test essay with long content
	db.prepare('DELETE FROM essays').run();
	const long_content = 'Word '.repeat(100);
	db.prepare('INSERT INTO essays (title, content, tags, read_time) VALUES (?, ?, ?, ?)').run(
		'Long Essay Title',
		long_content,
		'test',
		5
	);

	const res = await fetch(`${base_url}/api/essays`);
	assert.strictEqual(res.status, 200);
	const data = await res.json();
	
	assert.ok(data.length > 0);
	const essay = data[0];
	assert.strictEqual(essay.content, undefined, 'Essays list should not contain full content');
	assert.ok(essay.preview !== undefined, 'Essays list should contain preview');
	assert.ok(essay.preview.includes('...'), 'Preview should be truncated with ...');
});

test('api - get single essay returns full content', async (t) => {
	db.prepare('DELETE FROM essays').run();
	const content = 'This is the full body of the essay.';
	const result = db.prepare('INSERT INTO essays (title, content, tags, read_time) VALUES (?, ?, ?, ?)').run(
		'Single Essay',
		content,
		'test',
		5
	);
	const essay_id = result.lastInsertRowid;

	const res = await fetch(`${base_url}/api/essays/${essay_id}`);
	assert.strictEqual(res.status, 200);
	const essay = await res.json();
	assert.strictEqual(essay.content, content, 'Single essay fetch should return full content');
});

test('rate limiting - login endpoint limit', async (t) => {
	// We make 15 login requests. Since limit is 10, the subsequent ones should return 429.
	let status_codes = [];
	for (let i = 0; i < 15; i++) {
		const res = await fetch(`${base_url}/api/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password: 'wrong' })
		});
		status_codes.push(res.status);
	}
	assert.ok(status_codes.includes(429), 'At least one request should receive a 429 status code');
});
