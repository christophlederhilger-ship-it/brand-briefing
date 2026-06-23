import { jsPDF } from 'jspdf'
import { QUESTIONS, CHAPTERS } from '../questions'

// aggregat brand colors
const C = {
  black:  [27,  27,  28],
  white:  [255, 255, 255],
  gray:   [242, 242, 242],
  yellow: [255, 210, 48],
  dim:    [120, 120, 122],
  dimmer: [60,  60,  62],
}

const PAGE_W = 210   // A4 mm
const PAGE_H = 297
const MARGIN = 18
const COL_W  = PAGE_W - MARGIN * 2

// ─── helpers ──────────────────────────────────────────────────────────────────

function setFill(doc, rgb) { doc.setFillColor(...rgb) }
function setFont(doc, rgb) { doc.setTextColor(...rgb) }

function bg(doc) {
  setFill(doc, C.black)
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F')
}

function rule(doc, y, color = C.dimmer) {
  doc.setDrawColor(...color)
  doc.setLineWidth(0.3)
  doc.line(MARGIN, y, PAGE_W - MARGIN, y)
}

// Wraps text and returns next Y position
function text(doc, str, x, y, opts = {}) {
  const { size = 10, color = C.white, style = 'normal', maxW = COL_W, lineH = 1.4 } = opts
  doc.setFontSize(size)
  doc.setFont('helvetica', style)
  setFont(doc, color)
  const lines = doc.splitTextToSize(String(str || ''), maxW)
  doc.text(lines, x, y)
  return y + lines.length * size * 0.352778 * lineH
}

function addPage(doc) {
  doc.addPage()
  bg(doc)
}

function checkPageBreak(doc, y, needed = 20) {
  if (y + needed > PAGE_H - MARGIN) {
    addPage(doc)
    return MARGIN + 10
  }
  return y
}

// ─── Cover page ───────────────────────────────────────────────────────────────

function coverPage(doc, answers) {
  bg(doc)

  // Yellow accent bar top
  setFill(doc, C.yellow)
  doc.rect(0, 0, 4, PAGE_H, 'F')

  // aggregat wordmark
  text(doc, 'aggregat', MARGIN, 30, { size: 11, color: C.white, style: 'bold' })

  // Big headline
  text(doc, 'Brand Briefing', MARGIN, 80, { size: 36, color: C.white, style: 'bold', lineH: 1.1 })

  // Company name
  const company = answers.company_name || '—'
  text(doc, company, MARGIN, 105, { size: 18, color: C.yellow, style: 'bold' })

  // Contact line
  const contact = answers.contact
  if (contact?.name) {
    text(doc, `${contact.name}${contact.role ? ` · ${contact.role}` : ''}`, MARGIN, 118, {
      size: 10, color: C.dim,
    })
  }

  // Date
  const date = new Date().toLocaleDateString('de-AT', { day: '2-digit', month: 'long', year: 'numeric' })
  text(doc, date, MARGIN, 130, { size: 9, color: C.dimmer })

  // Bottom label
  text(doc, 'hi@aggregat.studio', MARGIN, PAGE_H - 14, { size: 8, color: C.dimmer })
  text(doc, 'Vertraulich', PAGE_W - MARGIN - 25, PAGE_H - 14, { size: 8, color: C.dimmer })
}

// ─── Chapter divider ──────────────────────────────────────────────────────────

function chapterDivider(doc, chapter, y) {
  y = checkPageBreak(doc, y, 30)

  // Yellow bar left
  setFill(doc, C.yellow)
  doc.rect(MARGIN, y - 4, 3, 14, 'F')

  // Chapter label
  text(doc, `Kapitel ${chapter.number}`, MARGIN + 8, y + 2, { size: 7.5, color: C.yellow, style: 'bold' })
  y = text(doc, chapter.title, MARGIN + 8, y + 8, { size: 14, color: C.white, style: 'bold' })

  y += 4
  rule(doc, y)
  return y + 6
}

// ─── Single question + answer ─────────────────────────────────────────────────

function questionBlock(doc, question, answer, y) {
  y = checkPageBreak(doc, y, 24)

  // Question label
  y = text(doc, question.label, MARGIN, y, { size: 8.5, color: C.dim, maxW: COL_W })
  y += 2

  // Format answer depending on type
  const formatted = formatAnswer(question, answer)

  if (!formatted || formatted === '—') {
    y = text(doc, '(keine Angabe)', MARGIN, y, { size: 10, color: C.dimmer, style: 'italic' })
  } else if (question.type === 'slider-pairs') {
    // Render each pair as a mini bar
    y = renderSliders(doc, question, answer, y)
  } else {
    y = text(doc, formatted, MARGIN, y, { size: 10.5, color: C.white, maxW: COL_W, lineH: 1.5 })
  }

  y += 5
  rule(doc, y, C.dimmer)
  return y + 6
}

function formatAnswer(question, answer) {
  if (answer === undefined || answer === null || answer === '') return '—'

  switch (question.type) {
    case 'contact': {
      if (!answer) return '—'
      return [answer.name, answer.role, answer.email, answer.phone]
        .filter(Boolean).join(' · ')
    }
    case 'multi-choice':
    case 'single-choice': {
      const parts = []
      if (answer?.selected?.length) parts.push(answer.selected.join(', '))
      if (answer?.custom?.trim()) parts.push(answer.custom.trim())
      return parts.join(', ') || '—'
    }
    case 'budget-range': {
      return answer || '—'
    }
    case 'file-upload': {
      if (!answer?.length) return '—'
      return answer.map(f => f.name).join(', ')
    }
    case 'slider-pairs': return '__sliders__'
    default: return String(answer).trim() || '—'
  }
}

function renderSliders(doc, question, answer, y) {
  const vals = answer || {}
  const barW = COL_W
  const barH = 2.5

  question.pairs.forEach((pair, i) => {
    y = checkPageBreak(doc, y, 14)
    const v = (vals[i] ?? 50) / 100

    // Labels
    text(doc, pair.left, MARGIN, y + 3, { size: 8, color: C.dim })
    text(doc, pair.right, MARGIN + barW, y + 3, { size: 8, color: C.dim, maxW: 40 })

    // Track
    setFill(doc, C.dimmer)
    doc.rect(MARGIN, y + 5, barW, barH, 'F')

    // Fill to position
    setFill(doc, C.yellow)
    doc.rect(MARGIN, y + 5, barW * v, barH, 'F')

    // Dot
    setFill(doc, C.yellow)
    doc.circle(MARGIN + barW * v, y + 5 + barH / 2, 2, 'F')

    y += 14
  })

  return y
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generatePdf(answers) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

  // Cover
  coverPage(doc, answers)

  // Content pages
  addPage(doc)
  let y = MARGIN + 8
  let lastChapter = null

  QUESTIONS.forEach((q) => {
    // Chapter divider when chapter changes
    if (q.chapter !== lastChapter) {
      if (lastChapter !== null) {
        // Small gap before new chapter
        y = checkPageBreak(doc, y, 20)
        y += 6
      }
      const chapter = CHAPTERS[q.chapter - 1]
      y = chapterDivider(doc, chapter, y)
      lastChapter = q.chapter
    }

    const answer = answers[q.id]
    // Skip file-upload (can't embed files in PDF)
    if (q.type === 'file-upload') {
      if (answer?.length) {
        y = questionBlock(doc, q, answer, y)
      }
      return
    }
    y = questionBlock(doc, q, answer, y)
  })

  // Footer on all pages
  const pageCount = doc.getNumberOfPages()
  for (let i = 2; i <= pageCount; i++) {
    doc.setPage(i)
    text(doc, `${i - 1} / ${pageCount - 1}`, PAGE_W - MARGIN - 10, PAGE_H - 8, {
      size: 7.5, color: C.dimmer,
    })
    text(doc, 'aggregat Brand Briefing · vertraulich', MARGIN, PAGE_H - 8, {
      size: 7.5, color: C.dimmer,
    })
  }

  return doc
}

export function downloadPdf(answers) {
  const doc = generatePdf(answers)
  const company = (answers.company_name || 'briefing').toLowerCase().replace(/\s+/g, '-')
  doc.save(`aggregat-briefing-${company}-${new Date().toISOString().slice(0, 10)}.pdf`)
}

export function getPdfBase64(answers) {
  const doc = generatePdf(answers)
  return doc.output('datauristring')
}
