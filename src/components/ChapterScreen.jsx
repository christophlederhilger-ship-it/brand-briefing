import { motion } from 'framer-motion'

export default function ChapterScreen({ chapter, onContinue }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-start justify-center px-6 sm:px-12 max-w-2xl mx-auto"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.span
        className="text-brand-yellow text-sm font-semibold tracking-widest uppercase mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Kapitel {chapter.number}
      </motion.span>

      <motion.h2
        className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {chapter.title}
      </motion.h2>

      <motion.p
        className="text-white/50 text-xl mb-14 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {chapter.subtitle}
      </motion.p>

      <motion.button
        onClick={onContinue}
        className="group flex items-center gap-3 text-white font-medium text-lg border-b border-white/20 pb-1 hover:border-brand-yellow hover:text-brand-yellow transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
      >
        Weiter
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </motion.button>

      {/* Decorative number */}
      <motion.div
        className="absolute right-8 bottom-16 text-[200px] font-black text-white/[0.03] leading-none select-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        aria-hidden="true"
      >
        {chapter.number}
      </motion.div>
    </motion.div>
  )
}
