/**
 * @file user_flow.test.js
 * @description Verifies user flow logic, ensuring HTML is clean of inline event handlers and scripts are separated.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('HTML files must not contain inline event handlers', (t) => {
	const files = ['index.html', 'admin.html', 'read.html'];
	const inline_events = ['onclick=', 'onsubmit=', 'onkeydown=', 'onkeyup='];

	files.forEach(file => {
		const file_path = path.join(__dirname, '../public', file);
		const content = fs.readFileSync(file_path, 'utf8');

		inline_events.forEach(evt => {
			assert.ok(!content.includes(evt), `File ${file} should not contain inline event attribute: ${evt}`);
		});
	});
});

test('HTML files must not contain inline logic scripts', (t) => {
	const files = ['index.html', 'admin.html', 'read.html'];
	
	files.forEach(file => {
		const file_path = path.join(__dirname, '../public', file);
		const content = fs.readFileSync(file_path, 'utf8');

		// Check for any <script> tag that does not have a "src" attribute
		// (which indicates inline javascript logic)
		const inline_script_regex = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/i;
		const has_inline_script = inline_script_regex.test(content);
		assert.ok(!has_inline_script, `File ${file} should not contain inline scripts without src`);
	});
});

test('index.js generates card anchor linking to read.html', (t) => {
	const script_path = path.join(__dirname, '../public/index.js');
	if (fs.existsSync(script_path)) {
		const content = fs.readFileSync(script_path, 'utf8');
		assert.ok(content.includes('href="read.html?id=${essay.id}"'), 'index.js must generate card links pointing to read.html?id=...');
	}
});

test('read.js extracts id from url query parameters', (t) => {
	const script_path = path.join(__dirname, '../public/read.js');
	if (fs.existsSync(script_path)) {
		const content = fs.readFileSync(script_path, 'utf8');
		assert.ok(content.includes('url_params.get(\'id\')'), 'read.js must extract id from url query parameters');
	}
});

test('read.html includes DOMPurify via script tag', (t) => {
	const file_path = path.join(__dirname, '../public/read.html');
	const content = fs.readFileSync(file_path, 'utf8');
	assert.ok(content.includes('purify.min.js') || content.includes('DOMPurify'), 'read.html should include DOMPurify script');
});

test('read.js uses DOMPurify to sanitize markdown output', (t) => {
	const script_path = path.join(__dirname, '../public/read.js');
	if (fs.existsSync(script_path)) {
		const content = fs.readFileSync(script_path, 'utf8');
		assert.ok(content.includes('DOMPurify.sanitize'), 'read.js must sanitize markdown with DOMPurify.sanitize');
	}
});
