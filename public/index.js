/**
 * @file index.js
 * @description Logic for overview page tags rendering, card list updates, and tag filtering.
 */

let active_tag = 'all';
let is_initial_load = true;

/**
 * Renders tag buttons at the top of the index page.
 * @returns {Promise<void>}
 */
async function render_tags() {
	const essays = await get_essays();
	const tags = await get_all_tags();
	const tag_list = document.getElementById('tagList');
	
	document.getElementById('allCount').innerText = essays.length;
	
	tag_list.innerHTML = `
		<button class="tag-btn ${active_tag === 'all' ? 'active' : ''}" data-tag="all">
			<span>Alle</span>
			<span class="tag-btn-count">${essays.length}</span>
		</button>
	`;

	tags.forEach(tag => {
		const count = essays.filter(e => e.tags.includes(tag)).length;
		tag_list.innerHTML += `
			<button class="tag-btn ${active_tag === tag ? 'active' : ''}" data-tag="${tag}">
				<span># ${tag}</span>
				<span class="tag-btn-count">${count}</span>
			</button>
		`;
	});
}

/**
 * Renders the filtered essay cards to the DOM.
 * @returns {Promise<void>}
 */
async function render_essays() {
	const essays = await get_essays();
	const list = document.getElementById('essayList');
	list.innerHTML = '';

	const filtered = active_tag === 'all' 
		? essays 
		: essays.filter(e => e.tags.includes(active_tag));

	if (filtered.length === 0) {
		list.innerHTML = `
			<div style="text-align: center; padding: 60px; color: var(--muted); border: 1px dashed var(--border); font-family: var(--font-mono); border-radius: var(--radius-lg); background: var(--surface);">
				Keine Gedanken in dieser Kategorie gefunden.
			</div>
		`;
		return;
	}

	filtered.forEach((essay, index) => {
		const tag_html = essay.tags.map(t => `<span class="essay-tag" role="button" tabindex="0" data-tag="${t}">${t}</span>`).join(' <span class="tag-separator">/</span> ');
		
		const preview_text = (essay.content && essay.content.length > 220)
			? essay.content.substring(0, 220) + '...' 
			: (essay.content || '');

		const stagger_class = is_initial_load ? 'reveal-item' : '';
		const stagger_style = is_initial_load ? `animation-delay: ${(index * 60) + 400}ms;` : '';

		let date_text;
		if (essay.id === 1 || essay.id === "1") {
			date_text = "28. Mai 2026";
		} else if (essay.id === 2 || essay.id === "2") {
			date_text = "15. April 2026";
		} else if (essay.id === 3 || essay.id === "3") {
			date_text = "04. März 2026";
		} else {
			const timestamp = parseInt(essay.id);
			if (!isNaN(timestamp)) {
				date_text = new Date(timestamp).toLocaleDateString('de-DE', {year: 'numeric', month: 'long', day: 'numeric'});
			} else {
				date_text = "Kürzlich veröffentlicht";
			}
		}

		list.innerHTML += `
			<a class="essay-card ${stagger_class}" style="${stagger_style} view-transition-name: card-${essay.id};" href="read.html?id=${essay.id}" data-od-id="card-${essay.id}">
				<div class="card-top">
					<span class="card-readtime">${essay.read_time || 0} Min Lesezeit</span>
					<time class="card-date">${date_text}</time>
				</div>
				<h2 class="card-title">${essay.title}</h2>
				<p class="card-preview">${preview_text}</p>
				<div class="card-bottom">
					${tag_html}
				</div>
			</a>
		`;
	});
}

/**
 * Filters essays and tags based on selected tag.
 * @param {string} tag - The tag to filter by.
 */
function filter_by_tag(tag) {
	active_tag = tag;
	if (document.startViewTransition) {
		document.startViewTransition(() => {
			render_tags();
			render_essays();
		});
	} else {
		render_tags();
		render_essays();
	}
}

// Event bindings & Initialization
document.addEventListener('DOMContentLoaded', () => {
	const url_params = new URLSearchParams(window.location.search);
	const tag_param = url_params.get('tag');
	if (tag_param) {
		active_tag = tag_param;
	}
	
	// Delegate click events on tagList container
	const tag_list_container = document.getElementById('tagList');
	if (tag_list_container) {
		tag_list_container.addEventListener('click', (e) => {
			const btn = e.target.closest('.tag-btn');
			if (btn) {
				const tag = btn.dataset.tag;
				filter_by_tag(tag);
			}
		});
	}

	// Delegate click events on essayList container for card tags
	const essay_list_container = document.getElementById('essayList');
	if (essay_list_container) {
		essay_list_container.addEventListener('click', (e) => {
			const tag_span = e.target.closest('.essay-tag');
			if (tag_span) {
				e.preventDefault();
				e.stopPropagation();
				const tag = tag_span.dataset.tag;
				filter_by_tag(tag);
			}
		});
	}

	render_tags();
	render_essays();
	
	setTimeout(() => {
		is_initial_load = false;
		document.querySelectorAll('.reveal-item').forEach(el => {
			el.classList.remove('reveal-item', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4', 'reveal-delay-5');
			el.style.opacity = '1';
		});
	}, 1500);
});
