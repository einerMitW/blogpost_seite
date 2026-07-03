
async function getEssays() {
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

async function getAllTags() {
  const essays = await getEssays();
  const tags = new Set();
  essays.forEach(e => {
    e.tags.forEach(t => tags.add(t));
  });
  return Array.from(tags);
}

async function addEssay(essay) {
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

async function deleteEssay(id) {
  const res = await fetch('/api/essays/' + id, {
    method: 'DELETE'
  });
  if (!res.ok) {
    alert("Error deleting essay");
  }
}
