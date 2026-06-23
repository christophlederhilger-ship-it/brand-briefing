import { getPdfBase64 } from './generatePdf'

// Submit-Endpoint – hier die URL eintragen, sobald das Backend steht.
const SUBMIT_ENDPOINT = 'https://YOUR_BACKEND_ENDPOINT/api/briefing'
const NOTIFY_EMAIL = 'hi@aggregat.studio'

export async function submitBriefing(answers) {
  // PDF als Base64 einmalig generieren
  const pdfDataUri = getPdfBase64(answers)
  const pdfBase64 = pdfDataUri.split(',')[1]

  const payload = {
    briefing: answers,
    submittedAt: new Date().toISOString(),
    notifyEmail: NOTIFY_EMAIL,
    pdfBase64,
  }

  const results = await Promise.allSettled([
    postToEndpoint(payload),
    sendEmailWithPdf(answers, pdfBase64),
  ])

  const errors = results
    .filter(r => r.status === 'rejected')
    .map(r => r.reason?.message || 'Unbekannter Fehler')

  if (errors.length === results.length) {
    throw new Error(errors.join('; '))
  }

  return { ok: true, errors }
}

async function postToEndpoint(payload) {
  if (SUBMIT_ENDPOINT.includes('YOUR_BACKEND')) {
    console.info('[Briefing] Kein Endpoint konfiguriert – übersprungen.')
    return
  }
  const res = await fetch(SUBMIT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

async function sendEmailWithPdf(answers, pdfBase64) {
  const company = answers.company_name || '(unbekannt)'
  const contact = answers.contact?.name || ''
  const subject = `Neues Brand Briefing: ${company}`

  // Stub – loggt in der Konsole.
  // Für Resend einkommentieren und API-Key setzen:
  //
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     from: 'briefing@aggregat.studio',
  //     to: NOTIFY_EMAIL,
  //     subject,
  //     text: `Neues Briefing von ${company} (${contact}) eingegangen.`,
  //     attachments: [{
  //       filename: `aggregat-briefing-${company}.pdf`,
  //       content: pdfBase64,
  //     }],
  //   }),
  // })

  console.info(`[Briefing] E-Mail an ${NOTIFY_EMAIL} | Betreff: ${subject}`)
  console.info(`[Briefing] PDF-Attachment: ${Math.round(pdfBase64.length * 0.75 / 1024)} KB`)
}
