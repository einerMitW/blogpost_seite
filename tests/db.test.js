/**
 * @file db.test.js
 * @description Tests database initialization, schema table structure, and CRUD operations.
 */

const test = require('node:test');
const assert = require('node:assert');

// Set env variable to use in-memory database
process.env.NODE_ENV = 'test';
const db = require('../server/db');

test('database connection and schema checks', (t) => {
	const table_info = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='essays'").get();
	assert.ok(table_info, 'The essays table should exist');
});

test('essay insertion and query operations', (t) => {
	// Clean table first
	db.prepare('DELETE FROM essays').run();

	// Insert test essay
	const insert_stmt = db.prepare('INSERT INTO essays (title, content, tags, read_time) VALUES (?, ?, ?, ?)');
	const info = insert_stmt.run('Test Title', 'Test Content', 'test, tags', 5);

	assert.strictEqual(info.changes, 1, 'Should insert exactly one row');

	// Query inserted essay
	const essay = db.prepare('SELECT * FROM essays WHERE id = ?').get(info.lastInsertRowid);
	assert.ok(essay, 'Should find the inserted essay');
	assert.strictEqual(essay.title, 'Test Title');
	assert.strictEqual(essay.content, 'Test Content');
	assert.strictEqual(essay.tags, 'test, tags');
	assert.strictEqual(essay.read_time, 5);
});
