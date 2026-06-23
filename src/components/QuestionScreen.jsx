import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextInput from './inputs/TextInput'
import TextareaInput from './inputs/TextareaInput'
import ContactInput from './inputs/ContactInput'
import MultiChoice from './inputs/MultiChoice'
import SliderPairs from './inputs/SliderPairs'
import BudgetRange from './inputs/BudgetRange'
import FileUpload from './inputs/FileUpload'

const INPUT_MAP = {
  text: TextInput,
  textarea: TextareaInput,
  contact: ContactInput,
  'single-choice': MultiChoice,
  'multi-choice': MultiChoice,
  'slider-pairs': SliderPairs,
  'budget-range': BudgetRange,
  'file-upload': FileUpload,
}

const slideVariants = (direction) => ({
  initial: { opacity: 0, y: direction === 'forward' ? 40 : -40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, y: direction === 'forward' ? -40 : 40, transition: { duration: 0.3 } },
})

export default function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  value,
  onChange,
  onNext,
  onBack,
  direction,
  error,
}) {
  const Input = INPUT_MAP[question.type] || TextInput
  const vars = slideVariants(direction)

  // Enter → next
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        onNext()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onNext])

  const isTextLike = ['text', 'textarea', 'contact'].includes(question.type)

  return (
    <motion.div
      key={question.id}
      initial={vars.initial}
      animate={vars.animate}
      exit={vars.exit}
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 max-w-2xl mx-auto pt-24 pb-24"
    >
      {/* Label + sublabel */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
        {question.label}
        {question.required && (
          <span className="text-brand-yellow ml-1 text-2xl align-super" aria-label="Pflichtfeld">*</span>
        )}
      </h2>

      {question.sublabel && (
        <p className="text-white/40 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
          {question.sublabel}
        </p>
      )}

      {/* Input */}
      <div className="mb-8">
        <Input question={question} value={value} onChange={onChange} />
      </div>

      {/* Validation error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-brand-yellow text-sm mb-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <button
          onClick={onNext}
          className="group relative flex items-center gap-3 px-7 py-3.5 bg-brand-yellow text-brand-black font-semibold text-base overflow-hidden transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          {questionNumber === totalQuestions ? 'Absenden' : 'Weiter'}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>

        {questionNumber > 1 && (
          <button
            onClick={onBack}
            className="text-white/30 hover:text-white/60 transition-colors text-sm font-medium"
          >
            ← Zurück
          </button>
        )}

        {isTextLike && (
          <span className="text-white/20 text-xs hidden sm:block">
            Enter drücken
          </span>
        )}
      </div>
    </motion.div>
  )
}
