const STORAGE_KEY = 'aggregat_briefing_v1'

export function saveAnswers(answers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers,
      savedAt: new Date().toISOString(),
    }))
  } catch (e) {
    console.warn('localStorage nicht verfügbar:', e)
  }
}

export function loadAnswers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed.answers || {}
  } catch {
    return {}
  }
}

export function clearAnswers() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

export function saveProgress(questionIndex) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : {}
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, questionIndex }))
  } catch {}
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 0
    const data = JSON.parse(raw)
    return data.questionIndex || 0
  } catch {
    return 0
  }
}

export function downloadJSON(answers) {
  const blob = new Blob(
    [JSON.stringify({ briefing: answers, exportedAt: new Date().toISOString() }, null, 2)],
    { type: 'application/json' }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `aggregat-briefing-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}
