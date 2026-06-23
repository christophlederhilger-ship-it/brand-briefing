import { useState } from 'react'
import { motion } from 'framer-motion'
import { downloadPdf } from '../utils/generatePdf'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function OutroScreen({ answers, submitState }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    // kurze Verzögerung damit der Button-State sichtbar wird
    setTimeout(() => {
      downloadPdf(answers)
      setDownloading(false)
    }, 150)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Animierter Checkmark */}
      <motion.div className="mb-12 relative" variants={item}>
        <motion.div
          className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M7 18L15 26L29 10" stroke="#1B1B1C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-brand-yellow"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.15, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}
      </motion.div>

      <motion.h1
        variants={item}
        className="text-4xl sm:text-6xl font-bold tracking-tight mb-5"
      >
        Danke. Wirklich.
      </motion.h1>

      <motion.p
        variants={item}
        className="text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed mb-4"
      >
        Ihr habt uns gerade das gegeben, was wir am meisten brauchen:
        ehrliche Antworten.
      </motion.p>

      <motion.p
        variants={item}
        className="text-white/40 text-base max-w-lg leading-relaxed mb-10"
      >
        Wir melden uns in den nächsten 1–2 Werktagen bei euch –
        mit einem ersten Gedanken und den nächsten Schritten.
      </motion.p>

      {/* Submit-Status */}
      <motion.div variants={item} className="mb-8 h-5">
        {submitState === 'sending' && (
          <p className="text-white/30 text-sm">Wird übermittelt …</p>
        )}
        {submitState === 'success' && (
          <p className="text-brand-yellow text-sm">✓ Briefing erfolgreich übermittelt</p>
        )}
        {submitState === 'error' && (
          <p className="text-white/40 text-sm">
            Übermittlung hat nicht geklappt – ladet euch das PDF herunter und schickt es uns.
          </p>
        )}
      </motion.div>

      {/* PDF Download */}
      <motion.button
        variants={item}
        onClick={handleDownload}
        disabled={downloading}
        className="group flex items-center gap-3 px-8 py-4 bg-brand-yellow text-brand-black font-semibold text-base transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-wait"
        whileTap={{ scale: 0.97 }}
      >
        {downloading ? (
          <>
            <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
            PDF wird erzeugt …
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v9M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Briefing als PDF herunterladen
          </>
        )}
      </motion.button>

      <motion.p
        variants={item}
        className="text-white/20 text-xs mt-4 max-w-xs"
      >
        Eine Kopie geht automatisch an hi@aggregat.studio.
      </motion.p>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/10 text-xs tracking-widest uppercase"
        variants={item}
      >
        aggregat · Brand Briefing
      </motion.div>
    </motion.div>
  )
}
