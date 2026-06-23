import { useEffect, useRef } from 'react'

export default function TextInput({ question, value, onChange }) {
  const ref = useRef()

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 300)
    return () => clearTimeout(t)
  }, [question.id])

  return (
    <div className="input-underline border-b border-white/20 pb-2">
      <input
        ref={ref}
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={question.placeholder || ''}
        className="w-full bg-transparent text-white text-2xl sm:text-3xl font-light outline-none placeholder:text-white/20 caret-brand-yellow"
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  )
}
