/**
 * @file user_flow.test.js
 * @description Verifies user flow logic via regex checks on HTML pages, ensuring dependency-free operation.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('user flow navigation link generation', (t) => {
	const index_html_path = path.join(__dirname, '../public/index.html');
	const index_html = fs.readFileSync(index_html_path, 'utf8');

	// Verify that the overview page generates a card anchor linking to read.html with the essay ID
	const has_read_link = index_html.includes('href="read.html?id=${essay.id}"');
	assert.ok(has_read_link, 'index.html must render card links pointing to read.html?id=...');
});

test('user flow details reading page parameter handling', (t) => {
	const read_html_path = path.join(__dirname, '../public/read.html');
	const read_html = fs.readFileSync(read_html_path, 'utf8');

	// Verify that read.html reads the essay ID from URL search parameters
	const reads_id_param = read_html.includes('url_params.get(\'id\')');
	assert.ok(reads_id_param, 'read.html must extract id from url query parameters');
});
