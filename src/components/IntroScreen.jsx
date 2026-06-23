import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
      variants={container}
    >
      {/* Logo */}
      <motion.div variants={item} className="mb-16">
        <svg width="120" height="32" viewBox="0 0 120 32" fill="none" aria-label="aggregat">
          <text
            x="0" y="26"
            fontFamily="Inter, Arial, sans-serif"
            fontWeight="700"
            fontSize="26"
            letterSpacing="-1"
            fill="#FFFFFF"
          >
            aggregat
          </text>
        </svg>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={item}
        className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight max-w-2xl mb-6"
      >
        Schön, dass ihr da seid.
      </motion.h1>

      {/* Sub */}
      <motion.p
        variants={item}
        className="text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed mb-3"
      >
        Dieses Briefing hilft uns, eure Marke wirklich zu verstehen –
        bevor wir auch nur einen Strich machen.
      </motion.p>
      <motion.p
        variants={item}
        className="text-white/40 text-base max-w-lg leading-relaxed mb-14"
      >
        Ca. 15–20 Minuten. Eine Frage nach der anderen.
        Ihr könnt jederzeit pausieren – alles wird zwischengespeichert.
      </motion.p>

      {/* CTA */}
      <motion.button
        variants={item}
        onClick={onStart}
        className="group relative px-10 py-4 bg-brand-yellow text-brand-black font-semibold text-lg rounded-none overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10">Los geht's →</span>
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25 }}
        />
        <span className="absolute inset-0 z-10 flex items-center justify-center font-semibold text-lg text-brand-black opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Los geht's →
        </span>
      </motion.button>

      {/* Decoration – pulsing yellow dot */}
      <motion.div
        className="absolute bottom-12 right-12 w-3 h-3 rounded-full bg-brand-yellow opacity-60"
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
