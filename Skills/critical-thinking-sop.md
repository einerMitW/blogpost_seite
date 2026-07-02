---
description: "Agiert als universeller kritischer Denker, um Texte, Argumente, Meinungen und Architekturentscheidungen tiefgehend zu sezieren, logische Brüche aufzudecken und versteckte Grundannahmen offenzulegen."
trigger: "Sobald eine Behauptung, ein Textentwurf, eine Meinung oder eine technische (Architektur-)Entscheidung zur kritischen Überprüfung vorgelegt wird."
---

# SOP: Universelles Kritisches Denken & Annahmen-Analyse

## 🎯 Objective
Das Ziel dieses Prozesses ist es, die Tragfähigkeit von Aussagen, Texten und Architekturentscheidungen über verschiedene Domänen hinweg objektiv zu prüfen. Dabei werden implizite Grundannahmen offengelegt, Logikfehler isoliert und die tatsächliche Substanz einer Entscheidung oder Behauptung bewertet.

## 🛠️ Prerequisites
* Die zu prüfende Eingabe (Essay-Entwurf, Software-Architektur-Vorschlag, Meinung oder Argument) liegt schriftlich oder klar formuliert vor.
* Die Bereitschaft, auch "Sowieso-Entscheidungen" oder vermeintliche Industriestandards radikal infrage zu stellen.

## 📝 Step-by-Step Process (Tier 2: The Process)

### 1. Initial Check & Kontextualisierung
* **Domänen-Zuordnung**: Identifiziere den Kontext (z. B. Software-Architektur, Essay/Argumentation, persönliche Meinung).
* **Ziel-Isolierung**: Was ist die Kernbotschaft oder das primäre Ziel der Aussage? (z. B. "Wir wollen Komponente X einführen" oder "These Y beweisen").

### 2. Execution
* **Aufdeckung versteckter Annahmen (Kernschritt)**: 
    * Analysiere, auf welchen ungesprochenen Voraussetzungen die Aussage basiert, damit sie überhaupt logisch Sinn ergibt.
    * *Beispiel (Software)*: „Wir brauchen Redis für schnelleres Caching“ ➔ *Versteckte Annahme*: Wir haben (oder erwarten) eine so hohe Nutzerlast, dass die Primärdatenbank überlastet wird und Latenzen spürbar werden.
    * *Beispiel (Argument/Meinung)*: „Wir sollten das Feature weglassen, weil die User es nicht verstehen“ ➔ *Versteckte Annahme*: Die aktuelle Benutzeroberfläche ist nicht intuitiv genug und kann nicht verbessert werden.
* **Prüfung der Annahmen-Validität**: Hinterfrage jede gefundene Annahme: Ist sie durch Daten/Fakten gedeckt oder ist es eine bloße Vermutung?
* **Schwachstellen- & Fehlschluss-Analyse**:
    * *In Texten/Essays*: Suche nach Zirkelschluss, Strohmann-Argumenten oder dem Ignorieren von Gegenargumenten.
    * *In der Software-Architektur*: Suche nach *Resume-Driven Development* (Technologie-Wahl nur für den Lebenslauf), *Overengineering* oder blindem Folgen von Trends ohne lokalen Nutzwert.
* **Konsequenzen-Matrix**: Welche Folgeprobleme entstehen, wenn man der Aussage folgt? (z. B. Höhere Komplexität, Wartungsaufwand, logische Folgefehler im Essay).

### 3. Validation
* **Stresstest-Ergebnis**: Welche der aufgestellten Behauptungen halten stand, sobald man ihre Grundannahmen entkräftet?
* **Alternativ-Check**: Gibt es einfachere, logischere oder pragmatischere Wege, das eigentliche Ziel zu erreichen, ohne die unbewiesenen Annahmen zu akzeptieren?

## 📚 Deep Knowledge (Tier 3: References)
- **First Principles Thinking**: Die Methode (bekannt durch Physik und u.a. Elon Musk), Probleme auf ihre fundamentalsten, unumstößlichen Wahrheiten herunterzubrechen, anstatt per Analogie ("Das macht man halt so") zu argumentieren.
- **Architecture Decision Records (ADRs)**: Ein Industriestandard in der Softwareentwicklung, um das "Warum" hinter Architekturentscheidungen (inklusive Kontext und abgewogenen Alternativen) transparent zu dokumentieren.
- **Das '5-Whys'-Framework**: Eine simple, aber effektive Fragetechnik (ursprünglich von Sakichi Toyoda), bei der das fünfmalige Hintereinander-Fragen nach dem „Warum“ die tiefste Ursache oder versteckte Annahme eines Problems freilegt.