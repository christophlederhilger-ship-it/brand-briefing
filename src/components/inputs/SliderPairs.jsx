import { motion } from 'framer-motion'

export default function SliderPairs({ question, value, onChange }) {
  const values = value || {}

  const update = (pairIndex, val) => {
    onChange({ ...values, [pairIndex]: Number(val) })
  }

  return (
    <div className="w-full space-y-8">
      {question.pairs.map((pair, i) => {
        const v = values[i] ?? 50
        return (
          <div key={i} className="w-full">
            <div className="flex justify-between mb-3">
              <span className={`text-sm font-medium transition-colors duration-200 ${v < 40 ? 'text-brand-yellow' : 'text-white/40'}`}>
                {pair.left}
              </span>
              <span className={`text-sm font-medium transition-colors duration-200 ${v > 60 ? 'text-brand-yellow' : 'text-white/40'}`}>
                {pair.right}
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 -translate-x-px pointer-events-none" aria-hidden="true" />
              <input
                type="range"
                min="0"
                max="100"
                value={v}
                onChange={e => update(i, e.target.value)}
                className="w-full"
                aria-label={`${pair.left} bis ${pair.right}`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
