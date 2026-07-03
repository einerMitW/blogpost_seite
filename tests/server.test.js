/**
 * @file server.test.js
 * @description Tests server routing, REST endpoints, and authentication.
 */

const test = require('node:test');
const assert = require('node:assert');

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
