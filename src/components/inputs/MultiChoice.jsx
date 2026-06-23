import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MultiChoice({ question, value, onChange }) {
  const selected = value?.selected || []
  const custom = value?.custom || ''

  const toggle = (opt) => {
    const next = selected.includes(opt)
      ? selected.filter(s => s !== opt)
      : [...selected, opt]
    onChange({ selected: next, custom })
  }

  const updateCustom = (v) => onChange({ selected, custom: v })

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 mb-6">
        {question.options.map(opt => {
          const active = selected.includes(opt)
          return (
            <motion.button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`px-4 py-2.5 text-sm sm:text-base font-medium border transition-colors duration-150 ${
                active
                  ? 'bg-brand-yellow text-brand-black border-brand-yellow'
                  : 'bg-transparent text-white border-white/20 hover:border-white/50'
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {active && <span className="mr-2">✓</span>}
              {opt}
            </motion.button>
          )
        })}
      </div>

      {question.allowCustom && (
        <div className="input-underline border-b border-white/20 pb-2 mt-2">
          <input
            type="text"
            value={custom}
            onChange={e => updateCustom(e.target.value)}
            placeholder={question.customPlaceholder || 'Eigene Antwort ...'}
            className="w-full bg-transparent text-white text-lg font-light outline-none placeholder:text-white/20 caret-brand-yellow"
          />
        </div>
      )}
    </div>
  )
}
