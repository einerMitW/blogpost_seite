# Entwicklungsregeln für Software

In diesem Dokument werden grundlegende Prinzipien und Best Practices für die Softwareentwicklung festgehalten. Das Ziel ist es, einen sauberen, wartbaren und robusten Code zu erstellen.

## Git Commit
Die Commit Message dint zur Dokumentation was geändert wird und sollte klar beschreiben was dieser Commit gemacht hat.
- changed: anpassungen an Datein.
- added: Hinzufügen von Features oder Datein
- refactord: Unveränderte äusere Funktionsweise des Codes, jedoch mit anderer Interner Struktur.
- fixed: direkt in relation zu einem offenen Bug Ticket.

## Projekt Sprache
Englisch

## Clean Code
Clean Code ist Code, der leicht zu lesen, zu verstehen und zu warten ist.

### Aussagekräftige Namen
Variablen, Funktionen und Klassen sollten Namen haben, die ihren Zweck klar beschreiben.

### Einrücken
Eingerückt wird mit einem Tap pro Einrückung.

### Variablen Konventionen
snake_case

### Funktionen

- **Eine Aufgabe pro Funktion:** Jede Funktion sollte genau eine Aufgabe erledigen.
- **Kurz halten:** Funktionen sollten so kurz wie möglich sein.
- **Wenig Argumente:** Je weniger Argumente eine Funktion hat, desto einfacher ist sie zu verwenden.

### Kommentare

- **docString** Jede methode bzw. Funktion sollte einen doc String nach dem folgenden format habe. Er stellt klar was die Funktion tut und welche Parameter als In / Output verwendet werden.
- **Kommentare erklären das *Warum*, nicht das *Was***: Guter Code ist selbsterklärend. Kommentare sollten nur dann verwendet werden, wenn die Logik komplex ist und eine Erklärung benötigt, warum sie auf eine bestimmte Weise implementiert wurde.
- **Vermeide auskommentierten Code:** Auskommentierter Code sollte gelöscht werden. Versionskontrollsysteme wie Git können alte Versionen wiederherstellen.

## KISS (Keep It Simple, Stupid)

**Prinzip:** Alles sollte so einfach wie möglich gehalten werden. Komplexität sollte nur dann hinzugefügt werden, wenn sie absolut notwendig ist. Einfacher Code ist leichter zu verstehen, zu debuggen und zu warten.

## DRY (Don't Repeat Yourself)

**Prinzip:** Code-Wiederholungen sind zu vermeiden. Jedes Stück Wissen oder Logik in einem System sollte eine einzige, eindeutige und maßgebliche Repräsentation haben. Code-Duplizierung führt zu Inkonsistenzen und erschwert die Wartung.

## YAGNI (You Ain't Gonna Need It)

**Prinzip:** Es sollte keine Funktionalität implementiert werden, von der nur angenommen wird, dass sie in Zukunft benötigt wird. Der Fokus sollte auf den aktuellen Anforderungen liegen. Dies vermeidet unnötigen Code und Komplexität.

## Git Branching Modell

Wir verwenden ein einfaches, aber robustes Branching-Modell, um die Entwicklung organisiert und stabil zu halten.

### Kernprinzipien

1.  **`main`:** Dieser Branch enthält ausschließlich **produktionsreifen Code**. Es wird niemals direkt auf `main` gearbeitet.
2.  **`develop`:** Der Haupt-Integrationsbranch. Alle neuen Features werden hier zusammengeführt. Er repräsentiert den aktuellen Entwicklungsstand für das nächste Release.
3.  **`feature/*`:** Für jede neue Funktion wird ein eigener Branch von `develop` erstellt. Dies isoliert die Arbeit und verhindert Konflikte.

### Workflow

- **Start:** Ein neuer Feature-Branch wird immer vom aktuellen `develop`-Branch abgezweigt (`git switch -c feature/mein-feature`).
- **Entwicklung:** Commits werden regelmäßig auf dem Feature-Branch gemacht.
- **Abschluss:** Wenn das Feature fertig ist, wird der Feature-Branch in den develob Branch gemerged / rebased. Dazu:
    1. auf dem Aktuellen Feature branch alle änderungen des Develop Branches holen (Code Branch)
        ```bash
        git checkout feature-branch
        git pull origin Code
        ```
    2. Manuelles Lösen von eventuellen Merge Konfilikten. Diese Passieren auf dem Feature Branch und kolidieren somit nicht mit dem Entwicklungscode der Anwendung.
    3. Pushen des Konfiliktfreien Feature Branch
        ```bash
        git push origin feature-branch
        ```
    4. Erstellen eines Pull Request in Github zum mergen des Feature Branches in den Entwicklungs (Code) Branch.
       Source: feature-branch und Target: code

### Schaubild: Branch-Architektur

```
main:    --------------------------------------------o (Release v1.0)
           ^
           | (Merge)
develop: --o-----------o-------------------o---------o------>
             \         / \                 /
              \       /   \               /
feature/a:     `-----`     \             /
                            \           /
feature/b:                   `---------`
```