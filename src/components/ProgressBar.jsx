import { motion } from 'framer-motion'

export default function ProgressBar({ current, total, chapterLabel }) {
  const pct = Math.round(((current + 1) / total) * 100)

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-6 pt-5 pb-3">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/40 tracking-widest uppercase">
            {chapterLabel}
          </span>
          <span className="text-xs font-medium text-white/40">
            {current + 1} / {total}
          </span>
        </div>
        <div className="h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-yellow rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
