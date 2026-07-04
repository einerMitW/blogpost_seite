/**
 * @file backup.test.js
 * @description Tests the database backup and rotation script.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

// Set env variable to use test database configuration
process.env.NODE_ENV = 'test';

test('database backup and rotation verification', (t) => {
	const backups_dir = path.join(__dirname, '../data/backups');
	
	// Ensure clean start
	if (fs.existsSync(backups_dir)) {
		fs.rmSync(backups_dir, { recursive: true, force: true });
	}

	// Create test database file to backup
	const db_dir = path.join(__dirname, '../data');
	if (!fs.existsSync(db_dir)) {
		fs.mkdirSync(db_dir, { recursive: true });
	}
	const db_file = path.join(db_dir, 'blog.db');
	fs.writeFileSync(db_file, 'dummy db content');

	// Require the backup script
	const { run_backup } = require('../scripts/backup');

	// 1. Run backup once and check if file is created
	run_backup();

	assert.ok(fs.existsSync(backups_dir), 'Backups directory should be created');
	let files = fs.readdirSync(backups_dir);
	assert.strictEqual(files.length, 1, 'Exactly one backup file should be created');
	assert.ok(files[0].startsWith('backup_'), 'Backup filename should start with backup_');
	assert.ok(files[0].endsWith('.db'), 'Backup filename should end with .db');

	// 2. Run backup 11 times to test rotation (keeping only 10)
	for (let i = 0; i < 11; i++) {
		// Use a tiny block sync delay to ensure different timestamps in milliseconds
		const start = Date.now();
		while (Date.now() - start < 2) {
			// busy wait to ensure millisecond increment
		}
		run_backup();
	}

	files = fs.readdirSync(backups_dir);
	assert.strictEqual(files.length, 10, 'Rotation should keep exactly 10 backups');

	// Clean up
	fs.rmSync(backups_dir, { recursive: true, force: true });
});
