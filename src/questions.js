/**
 * questions.js — Alle Briefing-Fragen an einem Ort.
 *
 * Felder pro Frage:
 *   id          – eindeutiger Key (wird für localStorage + JSON-Export verwendet)
 *   chapter     – Kapitelnummer (1–6), verknüpft mit CHAPTERS
 *   type        – 'text' | 'textarea' | 'single-choice' | 'multi-choice' |
 *                 'slider-pairs' | 'budget-range' | 'file-upload' | 'contact'
 *   label       – Die Frage selbst
 *   sublabel    – Kurzer erläuternder Untertitel (optional)
 *   placeholder – Platzhaltertext für Freitext-Felder
 *   required    – true / false
 *   options     – Array von Strings (für choice-Typen)
 *   pairs       – Array von { left, right } Objekten (für slider-pairs)
 *   ranges      – Array von { label, value } (für budget-range)
 */

export const CHAPTERS = [
  { number: 1, title: 'Das Projekt',     subtitle: 'Was bringt euch zu uns, und was braucht ihr?' },
  { number: 2, title: 'Das Unternehmen', subtitle: 'Wer ihr seid und was ihr tut.' },
  { number: 3, title: 'Zielgruppe & Markt', subtitle: 'Für wen macht ihr das, und gegen wen?' },
  { number: 4, title: 'Marke & Positionierung', subtitle: 'Wofür ihr steht – und wie ihr rüberkommen wollt.' },
  { number: 5, title: 'Design & Ästhetik', subtitle: 'Was euer Auge mag – und was nicht.' },
  { number: 6, title: 'Ziel & Erfolg',   subtitle: 'Was am Ende zählt.' },
]

export const QUESTIONS = [
  // ─── Kapitel 1: Das Projekt ───────────────────────────────────────────────
  {
    id: 'company_name',
    chapter: 1,
    type: 'text',
    label: 'Wie heißt eure Marke oder euer Unternehmen?',
    sublabel: 'Falls ihr noch keinen Namen habt – was verwenden wir als Arbeitstitel?',
    placeholder: 'z.B. Muster GmbH',
    required: true,
  },
  {
    id: 'contact',
    chapter: 1,
    type: 'contact',
    label: 'Mit wem reden wir?',
    sublabel: 'Name, Rolle und E-Mail-Adresse – damit wir die Rückmeldung an die richtige Person schicken.',
    required: true,
  },
  {
    id: 'project_scope',
    chapter: 1,
    type: 'multi-choice',
    label: 'Was braucht ihr genau?',
    sublabel: 'Mehrfachauswahl möglich – alles, was zutrifft.',
    required: true,
    options: [
      'Komplett-Marke (Strategie + Design)',
      'Rebrand (bestehende Marke neu aufstellen)',
      'Brand Refresh (kleinere Überarbeitung)',
      'Naming (Markenname finden)',
      'Logo only',
      'Brand Strategy only',
      'Anderes',
    ],
  },
  {
    id: 'project_trigger',
    chapter: 1,
    type: 'textarea',
    label: 'Was ist der Auslöser – warum jetzt?',
    sublabel: 'Neugründung, Relaunch, Expansion, Wettbewerbsdruck, oder etwas ganz anderes?',
    placeholder: 'Erzählt uns den Kontext ...',
    required: true,
  },
  {
    id: 'deadline',
    chapter: 1,
    type: 'text',
    label: 'Wann braucht ihr das fertig?',
    sublabel: 'Konkretes Datum oder Zeitraum – oder "so schnell wie möglich".',
    placeholder: 'z.B. Ende Q3 2025, oder: Messetermin 15. Oktober',
    required: false,
  },
  {
    id: 'budget',
    chapter: 1,
    type: 'budget-range',
    label: 'In welchem Budget-Rahmen bewegen wir uns?',
    sublabel: 'Kein Richtig oder Falsch – hilft uns, das Projekt realistisch zu planen. Optional.',
    required: false,
    ranges: [
      { label: 'Unter 5.000 €',       value: 'under_5k' },
      { label: '5.000 – 10.000 €',    value: '5k_10k' },
      { label: '10.000 – 20.000 €',   value: '10k_20k' },
      { label: '20.000 – 50.000 €',   value: '20k_50k' },
      { label: '50.000 – 100.000 €',  value: '50k_100k' },
      { label: 'Über 100.000 €',      value: 'over_100k' },
      { label: 'Lieber besprechen',   value: 'discuss' },
    ],
  },

  // ─── Kapitel 2: Das Unternehmen ───────────────────────────────────────────
  {
    id: 'what_you_do',
    chapter: 2,
    type: 'textarea',
    label: 'Was macht ihr – in einem Satz?',
    sublabel: 'Kein Marketing-Sprech. So, wie ihr es einem Freund erklären würdet.',
    placeholder: 'Wir helfen ... indem wir ...',
    required: true,
  },
  {
    id: 'company_age_size',
    chapter: 2,
    type: 'textarea',
    label: 'Seit wann gibt es euch, und wie groß seid ihr?',
    sublabel: 'Gründungsjahr, Mitarbeiteranzahl, Standorte – was ihr für relevant haltet.',
    placeholder: 'Gegründet 2019, 12 Personen, Standort Wien ...',
    required: false,
  },
  {
    id: 'problem_solved',
    chapter: 2,
    type: 'textarea',
    label: 'Welches Problem löst ihr für eure Kund:innen?',
    sublabel: 'Was wäre ohne euch schlechter, schwieriger oder teurer?',
    placeholder: 'Ohne uns müssten unsere Kund:innen ...',
    required: true,
  },
  {
    id: 'product_portfolio',
    chapter: 2,
    type: 'textarea',
    label: 'Was ist euer Angebot – Produkte, Dienstleistungen, Portfolio?',
    sublabel: 'Stichpunkte reichen völlig.',
    placeholder: 'Produkt A, Service B, Abonnement C ...',
    required: false,
  },

  // ─── Kapitel 3: Zielgruppe & Markt ───────────────────────────────────────
  {
    id: 'primary_audience',
    chapter: 3,
    type: 'textarea',
    label: 'Wer ist eure wichtigste Zielgruppe?',
    sublabel: 'So konkret wie möglich: Alter, Job, Lebenssituation, Mindset. Gerne eine Persona.',
    placeholder: 'Typischerweise: 30–45, selbstständig, kauft bewusst ein ...',
    required: true,
  },
  {
    id: 'secondary_audiences',
    chapter: 3,
    type: 'textarea',
    label: 'Gibt es weitere Zielgruppen?',
    sublabel: 'Wer kauft noch, wer empfiehlt weiter, wen wollt ihr zukünftig erreichen?',
    placeholder: 'Sekundär: ...',
    required: false,
  },
  {
    id: 'competitors',
    chapter: 3,
    type: 'textarea',
    label: 'Wer sind eure 3–5 wichtigsten Mitbewerber:innen?',
    sublabel: 'Namen, Links, oder kurze Beschreibung – was immer euch einfällt.',
    placeholder: 'Konkurrent A (warum relevant) ...',
    required: true,
  },
  {
    id: 'competitor_analysis',
    chapter: 3,
    type: 'textarea',
    label: 'Was machen die gut – und was schlecht?',
    sublabel: 'Ehrliche Einschätzung. Was lernen wir daraus für eure Positionierung?',
    placeholder: 'Gut: ...\nSchlecht: ...',
    required: false,
  },
  {
    id: 'differentiation',
    chapter: 3,
    type: 'textarea',
    label: 'Wie wollt ihr euch klar unterscheiden?',
    sublabel: 'Was macht euch einzigartig, was kann niemand sonst behaupten?',
    placeholder: 'Wir sind die einzigen, die ...',
    required: true,
  },

  // ─── Kapitel 4: Marke & Positionierung ───────────────────────────────────
  {
    id: 'brand_core',
    chapter: 4,
    type: 'textarea',
    label: 'Wofür steht eure Marke – was ist der Kern?',
    sublabel: 'Nicht der Claim, nicht das Produkt. Die tiefere Überzeugung dahinter.',
    placeholder: 'Wir glauben, dass ...',
    required: true,
  },
  {
    id: 'brand_values',
    chapter: 4,
    type: 'multi-choice',
    label: 'Welche Werte treffen auf eure Marke zu?',
    sublabel: 'Wählt 3–5, die wirklich passen. Nicht die, die ihr gerne hättet.',
    required: false,
    options: [
      'Authentisch', 'Mutig', 'Nachhaltig', 'Präzise', 'Menschlich',
      'Visionär', 'Zugänglich', 'Premium', 'Verspielt', 'Direkt',
      'Verlässlich', 'Innovativ', 'Lokal', 'Global', 'Transparent',
      'Provokant', 'Warmherzig', 'Effizient', 'Kreativ', 'Vertrauenswürdig',
    ],
    allowCustom: true,
    customPlaceholder: 'Eigener Wert ...',
  },
  {
    id: 'brand_personality',
    chapter: 4,
    type: 'slider-pairs',
    label: 'Wenn eure Marke ein Mensch wäre – wie wäre der drauf?',
    sublabel: 'Zieht den Regler dorthin, wo eure Marke steht. Mitte = beides ein bisschen.',
    required: false,
    pairs: [
      { left: 'Verspielt',  right: 'Seriös' },
      { left: 'Klassisch',  right: 'Modern' },
      { left: 'Laut',       right: 'Leise' },
      { left: 'Premium',    right: 'Zugänglich' },
      { left: 'Emotional',  right: 'Rational' },
      { left: 'Mutig',      right: 'Beständig' },
    ],
  },
  {
    id: 'brand_feeling',
    chapter: 4,
    type: 'textarea',
    label: 'Was soll man fühlen, wenn man mit euch in Berührung kommt?',
    sublabel: 'Beim ersten Website-Besuch, beim Öffnen einer Verpackung, nach einem Meeting.',
    placeholder: 'Man soll das Gefühl haben, dass ...',
    required: true,
  },
  {
    id: 'brand_nogo',
    chapter: 4,
    type: 'textarea',
    label: 'Was darf eure Marke auf keinen Fall sein?',
    sublabel: 'Rote Linien, Dinge, bei denen ihr sofort "Nein" denkt.',
    placeholder: 'Auf keinen Fall: billig wirkend, steif, zu verspielt ...',
    required: false,
  },

  // ─── Kapitel 5: Design & Ästhetik ────────────────────────────────────────
  {
    id: 'existing_assets',
    chapter: 5,
    type: 'file-upload',
    label: 'Gibt es bereits Marken-Assets?',
    sublabel: 'Logo, Farben, Fonts, Brand Guidelines – alles, was es schon gibt. Mehrere Dateien möglich.',
    required: false,
    accept: '.pdf,.png,.jpg,.jpeg,.svg,.ai,.eps,.zip',
    multiple: true,
  },
  {
    id: 'design_references',
    chapter: 5,
    type: 'textarea',
    label: 'Was gefällt euch – Referenzen, Marken, Links?',
    sublabel: 'Marken, die ihr bewundert (auch branchenfremde). Links zu Websites, Instagram-Accounts, Pinterest-Boards.',
    placeholder: 'Apple wegen ...\nLoewe weil ...\nhttps://...',
    required: false,
  },
  {
    id: 'design_dislikes',
    chapter: 5,
    type: 'textarea',
    label: 'Was gefällt euch gar nicht?',
    sublabel: 'Visuell, stilistisch, von der Anmutung her. Referenzen sind willkommen.',
    placeholder: 'Keine Grunge-Texturen, kein Neon, kein ...',
    required: false,
  },
  {
    id: 'color_preferences',
    chapter: 5,
    type: 'textarea',
    label: 'Farb-Tendenzen und No-Gos?',
    sublabel: 'Gibt es Farben, die passen müssen – oder solche, die tabu sind?',
    placeholder: 'Eher warme Töne, unbedingt kein Rot wegen ...',
    required: false,
  },
  {
    id: 'brand_touchpoints',
    chapter: 5,
    type: 'multi-choice',
    label: 'Wo wird die Marke vor allem leben?',
    sublabel: 'Das beeinflusst, welche Medien wir priorisieren.',
    required: true,
    options: [
      'Website',
      'Social Media (Instagram, LinkedIn, ...)',
      'Print (Folder, Broschüre, Geschäftspapier)',
      'Außenwerbung / Schilder',
      'Verpackung / Produkt',
      'Messe / Events',
      'App / Software-UI',
      'Video / Motion',
    ],
  },

  // ─── Kapitel 6: Ziel & Erfolg ─────────────────────────────────────────────
  {
    id: 'success_definition',
    chapter: 6,
    type: 'textarea',
    label: 'Was muss passieren, damit dieses Projekt ein Erfolg ist?',
    sublabel: 'Messbares oder Gefühltes – beides zählt.',
    placeholder: 'Erfolg sieht für uns so aus: ...',
    required: true,
  },
  {
    id: 'decision_makers',
    chapter: 6,
    type: 'textarea',
    label: 'Wer entscheidet bei euch final mit?',
    sublabel: 'Namen und Rollen – damit wir wissen, wen wir am Ende im Präsentationsraum haben.',
    placeholder: 'Geschäftsführung: ...\nMarketing-Leitung: ...',
    required: false,
  },
  {
    id: 'anything_else',
    chapter: 6,
    type: 'textarea',
    label: 'Noch etwas, das wir wissen sollten?',
    sublabel: 'Alles, was nicht in die anderen Fragen gepasst hat. Oder einfach: Hallo.',
    placeholder: 'Freie Fläche für alles andere ...',
    required: false,
  },
]
