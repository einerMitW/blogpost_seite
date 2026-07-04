/**
 * @file backup.js
 * @description Provides a function to backup the SQLite database with timestamped filenames and rotates/deletes older backups.
 */

const fs = require('fs');
const path = require('path');

/**
 * Backs up the blog SQLite database file and rotates backups to keep only the 10 most recent.
 * @returns {void}
 */
const run_backup = () => {
	const db_file = process.env.NODE_ENV === 'test'
		? path.join(__dirname, '../data/blog_test.db')
		: path.join(__dirname, '../data/blog.db');
	const backups_dir = path.join(__dirname, '../data/backups');

	if (!fs.existsSync(db_file)) {
		console.warn('Database file not found for backup:', db_file);
		return;
	}

	if (!fs.existsSync(backups_dir)) {
		fs.mkdirSync(backups_dir, { recursive: true });
	}

	// Create backup filename with high resolution timestamp
	const now = new Date();
	const pad = (n) => String(n).padStart(2, '0');
	const padMs = (n) => String(n).padStart(3, '0');
	const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}-${padMs(now.getMilliseconds())}`;
	
	const backup_file = path.join(backups_dir, `backup_${timestamp}.db`);
	
	// Copy database file
	fs.copyFileSync(db_file, backup_file);

	// Rotation: Keep only the 10 most recent backups
	const files = fs.readdirSync(backups_dir)
		.filter(f => f.startsWith('backup_') && f.endsWith('.db'))
		.map(f => ({ name: f, path: path.join(backups_dir, f), time: fs.statSync(path.join(backups_dir, f)).mtimeMs }));

	// Sort oldest first
	files.sort((a, b) => a.time - b.time);

	// If more than 10 files, delete the oldest
	if (files.length > 10) {
		const to_delete = files.length - 10;
		for (let i = 0; i < to_delete; i++) {
			fs.unlinkSync(files[i].path);
		}
	}
};

// Allow executing directly or importing
if (require.main === module) {
	run_backup();
}

module.exports = { run_backup };
