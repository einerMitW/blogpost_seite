/**
 * @file read.js
 * @description Logic for the read view page, parsing individual essay details, rendering markdown text.
 */

document.addEventListener('DOMContentLoaded', async () => {
	const url_params = new URLSearchParams(window.location.search);
	const id = url_params.get('id') || '1';
	
	const essays = await get_essays();
	const essay = essays.find(e => e.id === id || e.id.toString() === id) || essays[0];

	if (essay) {
		document.title = `${essay.title} · Gedankengang`;
		document.getElementById('articleTitle').innerText = essay.title;
		
		const date_text = format_date(essay.created_at);
		document.getElementById('metaDate').innerText = date_text;
		document.getElementById('metaReadTime').innerText = (essay.read_time || 0) + ' Min';
		
		document.getElementById('metaTags').innerHTML = essay.tags.map(t => `
			<a href="index.html?tag=${t}" class="essay-tag">${t}</a>
		`).join(' <span class="tag-separator" style="color: var(--border); font-family: var(--font-mono); font-size: 10px; margin: 0 4px; user-select: none;">/</span> ');

		document.getElementById("articleBody").innerHTML = marked.parse(essay.content || '');
	} else {
		document.title = "Gedanke nicht gefunden · Gedankengang";
		document.getElementById('articleTitle').innerText = "Gedanke nicht gefunden";
		document.getElementById('metaDate').innerText = "—";
		document.getElementById('metaReadTime').innerText = "—";
		document.getElementById('metaTags').innerHTML = "—";
		document.getElementById('articleBody').innerHTML = `
			<div style="text-align: center; padding: 40px 20px; color: var(--muted); border: 1px solid var(--border); font-family: var(--font-mono); background: var(--bg); margin-top: 20px;">
				Dieses Essay existiert nicht oder die Datenbank ist leer.<br><br>
				<a href="index.html" style="color: var(--accent); text-decoration: underline; font-family: var(--font-mono); font-size: 13px;">← Zurück zur Übersicht</a>
			</div>
		`;
	}
});
