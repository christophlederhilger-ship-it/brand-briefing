import { useEffect, useRef } from 'react'

export default function TextareaInput({ question, value, onChange }) {
  const ref = useRef()

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 300)
    return () => clearTimeout(t)
  }, [question.id])

  // Auto-resize
  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = 'auto'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }, [value])

  return (
    <div className="input-underline border-b border-white/20 pb-2">
      <textarea
        ref={ref}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={question.placeholder || ''}
        rows={3}
        className="w-full bg-transparent text-white text-xl sm:text-2xl font-light outline-none placeholder:text-white/20 caret-brand-yellow resize-none leading-relaxed"
        spellCheck="false"
      />
    </div>
  )
}
