/**
 * @file admin.js
 * @description Logic for the admin panel, handling authentication, article listing, and CRUD actions.
 */

const AUTH_KEY = 'blog_admin_logged_in';

/**
 * Checks server auth status and switches active screens.
 * @returns {Promise<void>}
 */
async function check_auth() {
	const is_logged_in = sessionStorage.getItem(AUTH_KEY) === 'true';
	if (is_logged_in) {
		document.getElementById('loginScreen').style.display = 'none';
		document.getElementById('adminDashboard').style.display = 'block';
		document.getElementById('logoutBtn').style.display = 'inline-block';
		render_admin_essays();
	} else {
		document.getElementById('loginScreen').style.display = 'block';
		document.getElementById('adminDashboard').style.display = 'none';
		document.getElementById('logoutBtn').style.display = 'none';
	}
}

/**
 * Submits admin login credentials.
 * @returns {Promise<void>}
 */
async function handle_login() {
	const password = document.getElementById('passwordInput').value;
	const error_div = document.getElementById('loginError');
	const res = await fetch('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password })
	});
	if (res.ok) {
		sessionStorage.setItem(AUTH_KEY, 'true');
		error_div.style.display = 'none';
		check_auth();
	} else {
		error_div.style.display = 'block';
	}
}

/**
 * Destroys the admin session.
 * @returns {Promise<void>}
 */
async function logout() {
	sessionStorage.removeItem(AUTH_KEY);
	await fetch("/api/logout", { method: "POST" });
	check_auth();
}

/**
 * Renders the essays inside the admin panel.
 * @returns {Promise<void>}
 */
async function render_admin_essays() {
	const essays = await get_essays();
	const list_container = document.getElementById('adminEssayList');
	list_container.innerHTML = '';

	// Stub card for creation focus
	list_container.innerHTML += `
		<button class="add-stub-card" id="focusFormBtn">
			+ NEUEN GEDANKEN VERFASSEN (FORMULAR FOKUSSIEREN)
		</button>
	`;

	essays.forEach(essay => {
		const date_text = format_date(essay.created_at);

		list_container.innerHTML += `
			<div class="admin-essay-item">
				<div class="item-info">
					<h4 class="item-title">${essay.title}</h4>
					<div class="item-meta">
						<span>${essay.read_time || 0} Min Lesezeit</span> · 
						<span>${date_text}</span>
					</div>
				</div>
				<button class="btn-delete" data-id="${essay.id}">Löschen</button>
			</div>
		`;
	});
}

/**
 * Focuses the essay title input field.
 */
function focus_form() {
	document.getElementById('essayTitle').focus();
}

/**
 * Event handler for submitting the essay creation form.
 * @param {Event} e - The submit event object.
 * @returns {Promise<void>}
 */
async function handle_create(e) {
	e.preventDefault();
	
	const title = document.getElementById('essayTitle').value;
	const tags_string = document.getElementById('essayTags').value;
	const read_time_raw = document.getElementById('essayReadTime').value;
	const content = document.getElementById('essayContent').value;

	const tags = tags_string.split(',').map(t => t.trim()).filter(t => t.length > 0);
	const read_time = parseInt(read_time_raw) || 0;

	const new_essay = {
		title,
		tags,
		read_time,
		content
	};

	await add_essay(new_essay);
	
	// Reset form
	document.getElementById('essayForm').reset();
	
	// Render
	render_admin_essays();
}

/**
 * Deletes an essay after browser confirmation.
 * @param {number|string} id - The essay ID to delete.
 * @returns {Promise<void>}
 */
async function handle_delete(id) {
	if (confirm('Möchten Sie diesen Eintrag wirklich löschen?')) {
		await delete_essay(id);
		render_admin_essays();
	}
}

// Bindings and listeners initialization
document.addEventListener('DOMContentLoaded', () => {
	// Login submit bindings
	const password_input = document.getElementById('passwordInput');
	if (password_input) {
		password_input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				handle_login();
			}
		});
	}

	const login_btn = document.querySelector('#loginScreen .btn');
	if (login_btn) {
		login_btn.addEventListener('click', handle_login);
	}

	// Logout bindings
	const logout_btn = document.getElementById('logoutBtn');
	if (logout_btn) {
		logout_btn.addEventListener('click', logout);
	}

	// Form creation bindings
	const essay_form = document.getElementById('essayForm');
	if (essay_form) {
		essay_form.addEventListener('submit', handle_create);
	}

	// Dynamic admin list delegation (delete clicks & focus stub card)
	const list_container = document.getElementById('adminEssayList');
	if (list_container) {
		list_container.addEventListener('click', (e) => {
			const delete_btn = e.target.closest('.btn-delete');
			if (delete_btn) {
				const id = delete_btn.dataset.id;
				handle_delete(id);
				return;
			}

			const focus_btn = e.target.closest('#focusFormBtn');
			if (focus_btn) {
				focus_form();
			}
		});
	}

	check_auth();
});
