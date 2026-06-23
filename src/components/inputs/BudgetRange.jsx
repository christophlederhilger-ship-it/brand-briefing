import { motion } from 'framer-motion'

export default function BudgetRange({ question, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 w-full">
      {question.ranges.map(range => {
        const active = value === range.value
        return (
          <motion.button
            key={range.value}
            type="button"
            onClick={() => onChange(active ? null : range.value)}
            className={`px-5 py-3 text-sm sm:text-base font-medium border transition-colors duration-150 ${
              active
                ? 'bg-brand-yellow text-brand-black border-brand-yellow'
                : 'bg-transparent text-white border-white/20 hover:border-white/50'
            }`}
            whileTap={{ scale: 0.97 }}
          >
            {range.label}
          </motion.button>
        )
      })}
    </div>
  )
}
