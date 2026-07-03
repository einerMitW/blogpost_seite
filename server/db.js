/**
 * @file db.js
 * @description Initializes the SQLite database connection and defines the essays schema.
 */

const Database = require('better-sqlite3');
const path = require('path');

// Determine database path based on environment
const db_path = process.env.NODE_ENV === 'test'
	? ':memory:'
	: path.join(__dirname, '../data/blog.db');

const db = new Database(db_path);

// Create the essays table if it doesn't exist
db.exec(`
	CREATE TABLE IF NOT EXISTS essays (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		content TEXT NOT NULL,
		tags TEXT,
		read_time INTEGER,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)
`);

// Seed default essays if table is empty
const row_count = db.prepare('SELECT COUNT(*) as count FROM essays').get().count;
if (row_count === 0) {
	const insert_stmt = db.prepare('INSERT INTO essays (title, content, tags, read_time, created_at) VALUES (?, ?, ?, ?, ?)');
	insert_stmt.run(
		'Warum Schreiben eine Superkraft für Entwickler ist',
		'Schreiben ist weit mehr als nur das Festhalten von Wörtern auf Papier oder einem Bildschirm. Für Softwareentwickler ist es ein fundamentales Denkwerkzeug. Wenn wir Code schreiben, lösen wir komplexe logische Probleme. Wenn wir jedoch über diesen Code oder die zugrundeliegenden Konzepte schreiben, zwingen wir unser Gehirn, die Annahmen zu hinterfragen und die Struktur unserer Gedanken zu ordnen. Ein gut geschriebener Essay dokumentiert nicht nur Wissen, sondern zeigt auch die Fähigkeit zur präzisen Kommunikation. Entwickler, die regelmäßig schreiben, können komplexe technische Sachverhalte einfacher erklären, was sie in Teams und bei der Zusammenarbeit mit Stakeholdern unersetzlich macht. Es ist ein Akt des \'Skin in the Game\' – man stellt seine Ideen zur Schau und setzt sich dem Feedback der Leser aus, was das eigene Wachstum beschleunigt.',
		'Technik, Schreiben, Karriere',
		6,
		'2026-05-28 14:00:00'
	);
	insert_stmt.run(
		'Architektur-Entscheidungen sauber dokumentieren',
		'In der Softwareentwicklung treffen wir täglich Dutzende von Entscheidungen. Warum haben wir uns für diese Datenbank entschieden? Warum nutzen wir dieses Microservice-Muster statt eines Monolithen? Monate später weiß das oft niemand mehr. Hier helfen Architecture Decision Records (ADRs). Ein ADR ist ein kurzes Textdokument, das eine Architekturentscheidung, ihren Kontext und ihre Konsequenzen beschreibt. Indem wir diese Entscheidungen schriftlich festhalten, schaffen wir ein historisches Protokoll für zukünftige Entwickler. Es verhindert langwierige Diskussionen über bereits gelöste Probleme und macht das Onboarding neuer Teammitglieder erheblich effizienter. Ein guter ADR sollte kurz sein, die Alternativen aufzeigen und die getroffene Wahl rational begründen.',
		'Software-Architektur, Dokumentation',
		8,
		'2026-04-15 10:00:00'
	);
	insert_stmt.run(
		'KISS: Keep It Simple, Stupid - in der Praxis',
		'Das KISS-Prinzip ist eines der bekanntesten Konzepte der Softwareentwicklung und doch eines der am schwersten umzusetzenden. Entwickler neigen dazu, Probleme vorauszusehen, die es noch gar nicht gibt. Wir bauen komplexe Abstraktionsschichten, Vererbungshierarchien und konfigurierbare Fabriken für Szenarien, die niemals eintreffen werden. Einfachheit erfordert Disziplin. Es bedeutet, die einfachste Lösung zu wählen, die das aktuelle Problem löst, ohne die Zukunft unnötig zu verbauen. Einfacher Code ist leichter zu lesen, leichter to testen und wesentlich wartungsärmer. Wenn du das nächste Mal versucht bist, eine generische Lösung für ein spezifisches Problem zu entwerfen, frage dich: Geht das auch einfacher?',
		'Programmierung, Clean Code',
		5,
		'2026-03-04 09:00:00'
	);
}

module.exports = db;
