/**
 * @file api.js
 * @description API client for fetching and updating essays on the backend server.
 */

/**
 * Fetches all essays from the database.
 * @returns {Promise<Array<Object>>} A list of essay objects.
 */
async function get_essays() {
	const res = await fetch('/api/essays');
	const essays = await res.json();
	essays.forEach(e => {
		if (typeof e.tags === 'string') {
			e.tags = e.tags.split(',').map(t => t.trim()).filter(Boolean);
		} else if (!e.tags) {
			e.tags = [];
		}
	});
	return essays;
}

/**
 * Extracts all unique tags from the existing essays.
 * @returns {Promise<Array<string>>} List of unique tag strings.
 */
async function get_all_tags() {
	const essays = await get_essays();
	const tags = new Set();
	essays.forEach(e => {
		e.tags.forEach(t => tags.add(t));
	});
	return Array.from(tags);
}

/**
 * Submits a new essay to the backend database.
 * @param {Object} essay - The essay object containing title, tags, read_time, and content.
 * @returns {Promise<void>}
 */
async function add_essay(essay) {
	const payload = { ...essay, tags: essay.tags.join(', ') };
	const res = await fetch('/api/essays', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	if (!res.ok) {
		alert("Error creating essay");
	}
}

/**
 * Removes an essay from the backend database.
 * @param {number|string} id - The ID of the essay to delete.
 * @returns {Promise<void>}
 */
async function delete_essay(id) {
	const res = await fetch('/api/essays/' + id, {
		method: 'DELETE'
	});
	if (!res.ok) {
		alert("Error deleting essay");
	}
}
