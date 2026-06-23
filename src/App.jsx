import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { QUESTIONS, CHAPTERS } from './questions'
import { saveAnswers, loadAnswers, saveProgress, loadProgress, clearAnswers } from './utils/storage'
import { submitBriefing } from './utils/submit'
import IntroScreen from './components/IntroScreen'
import ChapterScreen from './components/ChapterScreen'
import QuestionScreen from './components/QuestionScreen'
import OutroScreen from './components/OutroScreen'
import ProgressBar from './components/ProgressBar'
import MagneticCursor from './components/MagneticCursor'

// Build a flat list of "steps": chapter intro screens + question screens
function buildSteps() {
  const steps = []
  let seenChapters = new Set()

  QUESTIONS.forEach((q, idx) => {
    if (!seenChapters.has(q.chapter)) {
      seenChapters.add(q.chapter)
      steps.push({ type: 'chapter', chapter: CHAPTERS[q.chapter - 1] })
    }
    steps.push({ type: 'question', question: q, questionIndex: idx })
  })
  return steps
}

const STEPS = buildSteps()
const TOTAL_QUESTIONS = QUESTIONS.length

function validate(question, value) {
  if (!question.required) return null

  if (question.type === 'contact') {
    if (!value?.name?.trim()) return 'Bitte gib deinen Namen ein.'
    if (!value?.email?.trim()) return 'E-Mail-Adresse fehlt.'
    return null
  }
  if (question.type === 'multi-choice') {
    if (!value?.selected?.length && !value?.custom?.trim()) {
      return 'Bitte wähle mindestens eine Option.'
    }
    return null
  }
  if (question.type === 'file-upload') return null
  if (question.type === 'budget-range') return null
  if (question.type === 'slider-pairs') return null

  if (!value || (typeof value === 'string' && !value.trim())) {
    return 'Bitte füll dieses Feld aus.'
  }
  return null
}

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState('intro') // intro | briefing | outro
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState(() => loadAnswers())
  const [direction, setDirection] = useState('forward')
  const [error, setError] = useState(null)
  const [submitState, setSubmitState] = useState(null) // null | sending | success | error
  const touchStart = useRef(null)

  // Restore progress
  useEffect(() => {
    const saved = loadProgress()
    if (saved > 0) setStepIndex(saved)
  }, [])

  // Swipe support
  useEffect(() => {
    const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
    const onTouchEnd = (e) => {
      if (touchStart.current === null) return
      const diff = touchStart.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 60) diff > 0 ? handleNext() : handleBack()
      touchStart.current = null
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  })

  // Arrow key navigation
  useEffect(() => {
    const handler = (e) => {
      if (phase !== 'briefing') return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handleBack()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const currentStep = STEPS[stepIndex]

  // Count only question steps for progress
  const questionSteps = STEPS.filter(s => s.type === 'question')
  const currentQuestionSteps = STEPS.slice(0, stepIndex + 1).filter(s => s.type === 'question')
  const questionProgressIndex = currentQuestionSteps.length - 1

  const chapterForCurrentStep = currentStep?.type === 'question'
    ? CHAPTERS[currentStep.question.chapter - 1]
    : currentStep?.chapter

  const updateAnswer = useCallback((questionId, value) => {
    setAnswers(prev => {
      const next = { ...prev, [questionId]: value }
      saveAnswers(next)
      return next
    })
    setError(null)
  }, [])

  const handleNext = useCallback(() => {
    if (phase === 'intro') { setPhase('briefing'); return }

    if (currentStep?.type === 'chapter') {
      setDirection('forward')
      setStepIndex(i => { const n = i + 1; saveProgress(n); return n })
      return
    }

    if (currentStep?.type === 'question') {
      const q = currentStep.question
      const val = answers[q.id]
      const err = validate(q, val)
      if (err) { setError(err); return }
      setError(null)

      if (stepIndex >= STEPS.length - 1) {
        handleSubmit()
        return
      }

      setDirection('forward')
      setStepIndex(i => { const n = i + 1; saveProgress(n); return n })
    }
  }, [phase, currentStep, stepIndex, answers])

  const handleBack = useCallback(() => {
    if (stepIndex <= 0) return
    setDirection('back')
    setError(null)
    setStepIndex(i => { const n = i - 1; saveProgress(n); return n })
  }, [stepIndex])

  const handleSubmit = async () => {
    setPhase('outro')
    setSubmitState('sending')
    try {
      await submitBriefing(answers)
      setSubmitState('success')
      clearAnswers()
    } catch {
      setSubmitState('error')
    }
  }

  const isMobile = /Mobi|Android/i.test(navigator.userAgent)

  return (
    <div className="relative min-h-screen bg-brand-black text-white font-sans overflow-hidden">
      {/* Magnetic cursor – desktop only */}
      {!isMobile && !prefersReducedMotion && <MagneticCursor />}

      {/* Progress bar – only during briefing */}
      {phase === 'briefing' && currentStep?.type === 'question' && (
        <ProgressBar
          current={questionProgressIndex}
          total={TOTAL_QUESTIONS}
          chapterLabel={`Kapitel ${chapterForCurrentStep?.number} – ${chapterForCurrentStep?.title}`}
        />
      )}

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <IntroScreen key="intro" onStart={() => { setPhase('briefing') }} />
        )}

        {phase === 'briefing' && currentStep?.type === 'chapter' && (
          <ChapterScreen
            key={`chapter-${currentStep.chapter.number}`}
            chapter={currentStep.chapter}
            onContinue={handleNext}
          />
        )}

        {phase === 'briefing' && currentStep?.type === 'question' && (
          <QuestionScreen
            key={currentStep.question.id}
            question={currentStep.question}
            questionNumber={questionProgressIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            value={answers[currentStep.question.id]}
            onChange={(val) => updateAnswer(currentStep.question.id, val)}
            onNext={handleNext}
            onBack={handleBack}
            direction={direction}
            error={error}
          />
        )}

        {phase === 'outro' && (
          <OutroScreen
            key="outro"
            answers={answers}
            submitState={submitState}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
