# aggregat Brand Briefing

Ein interaktives One-Question-at-a-Time Briefing-Formular für neue Kunden.  
Gebaut mit React, Vite, Tailwind CSS und Framer Motion.

---

## Setup

```bash
cd brand-briefing
npm install
npm run dev
```

Öffne `http://localhost:3333` im Browser.

---

## Fragen anpassen

Alle Fragen und Kapitel liegen in **`src/questions.js`** – eine einzige Datei, kein Code sonst nötig.

### Eine Frage ändern

```js
{
  id: 'company_name',          // eindeutiger Key (nicht ändern, wenn schon Antworten gespeichert sind)
  chapter: 1,                  // Kapitelnummer 1–6
  type: 'text',                // siehe Typen unten
  label: 'Wie heißt eure Marke?',
  sublabel: 'Kurzer Erklärungstext (optional)',
  placeholder: 'z.B. Muster GmbH',
  required: true,              // Pflichtfeld-Validierung
}
```

### Fragen-Typen

| Typ             | Beschreibung                                       |
|-----------------|----------------------------------------------------|
| `text`          | Einzeiliges Textfeld                               |
| `textarea`      | Mehrzeiliges Textfeld (auto-resize)                |
| `contact`       | Name + Rolle + E-Mail + Telefon (4 Felder)         |
| `multi-choice`  | Mehrfachauswahl aus vorgegebenen Optionen          |
| `single-choice` | Einfachauswahl (gleiche Komponente, anderes UX)    |
| `slider-pairs`  | Persönlichkeits-Slider zwischen Gegensatzpaaren    |
| `budget-range`  | Budget-Auswahl als Chip-Grid                       |
| `file-upload`   | Drag & Drop Datei-Upload                           |

### Neue Frage hinzufügen

Einfach ein neues Objekt in das `QUESTIONS`-Array in `src/questions.js` einfügen.  
Position im Array = Reihenfolge im Formular. Kapitelwechsel passieren automatisch.

### Kapitel-Titel anpassen

```js
export const CHAPTERS = [
  { number: 1, title: 'Das Projekt', subtitle: 'Was bringt euch zu uns?' },
  // ...
]
```

---

## Submit-Endpoint einrichten

Öffne **`src/utils/submit.js`** und ersetze die Platzhalter:

```js
const SUBMIT_ENDPOINT = 'https://DEIN-ENDPOINT/api/briefing'  // ← hier
const NOTIFY_EMAIL = 'hi@aggregat.studio'                      // ← hier
```

Bis das Backend steht:
- Antworten werden **automatisch in `localStorage`** gespeichert
- Am Abschluss-Screen gibt es einen **JSON-Download-Button**
- Der Submit-Stub loggt in der Browser-Konsole

### E-Mail-Integration (Beispiel Resend)

Im `sendEmailStub`-Block in `submit.js` den kommentierten Code einkommentieren  
und mit dem jeweiligen API-Key bestücken.

---

## Features

- **One-Question-at-a-Time** – Typeform-Prinzip, eine Frage pro Screen
- **Kapitel-Intro-Screens** – erzählerische Struktur statt Behörden-Formular  
- **Auto-Save** – jede Antwort landet sofort in `localStorage`
- **Resume** – beim erneuten Öffnen wird die letzte Position wiederhergestellt
- **Keyboard-Navigation** – Enter (weiter), Pfeiltasten (vor/zurück)
- **Touch-Gesten** – Swipe links/rechts auf Mobile
- **Animierter Cursor** – magnetisch folgender Gelb-Punkt (Desktop)
- **Reduced Motion** – `prefers-reduced-motion` wird respektiert
- **JSON-Export** – Download der Antworten als strukturiertes JSON

---

## Projektstruktur

```
src/
├── questions.js              ← Alle Fragen & Kapitel (hier editieren)
├── App.jsx                   ← Haupt-State, Navigation, Flow-Steuerung
├── index.css                 ← Global Styles, Slider, Animations
├── main.jsx                  ← React-Einstiegspunkt
├── components/
│   ├── IntroScreen.jsx       ← Animierter Willkommens-Screen
│   ├── ChapterScreen.jsx     ← Kapitel-Zwischen-Screens
│   ├── QuestionScreen.jsx    ← Wrapper für alle Fragen
│   ├── OutroScreen.jsx       ← Danke-Screen mit Download
│   ├── ProgressBar.jsx       ← Fortschrittsanzeige oben
│   ├── MagneticCursor.jsx    ← Gelber Cursor-Follower
│   └── inputs/
│       ├── TextInput.jsx
│       ├── TextareaInput.jsx
│       ├── ContactInput.jsx
│       ├── MultiChoice.jsx
│       ├── SliderPairs.jsx
│       ├── BudgetRange.jsx
│       └── FileUpload.jsx
└── utils/
    ├── storage.js            ← localStorage + JSON-Download
    └── submit.js             ← POST-Endpoint + E-Mail-Stub
```

---

## Brand

aggregat · [hi@aggregat.studio](mailto:hi@aggregat.studio)
