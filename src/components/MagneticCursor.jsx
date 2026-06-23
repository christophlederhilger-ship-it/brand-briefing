import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticCursor() {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  const springConfig = { damping: 28, stiffness: 180, mass: 0.6 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const visible = useRef(false)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      visible.current = true
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      aria-hidden="true"
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-brand-yellow"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      />
    </motion.div>
  )
}
