import { useEffect, useRef } from 'react'

const FIELDS = [
  { key: 'name',  label: 'Name',        type: 'text',  placeholder: 'Vorname Nachname' },
  { key: 'role',  label: 'Rolle',       type: 'text',  placeholder: 'z.B. Gründer:in, Head of Marketing' },
  { key: 'email', label: 'E-Mail',      type: 'email', placeholder: 'name@unternehmen.at' },
  { key: 'phone', label: 'Telefon',     type: 'tel',   placeholder: '+43 ... (optional)' },
]

export default function ContactInput({ question, value, onChange }) {
  const firstRef = useRef()
  const data = value || {}

  useEffect(() => {
    const t = setTimeout(() => firstRef.current?.focus(), 300)
    return () => clearTimeout(t)
  }, [question.id])

  const update = (key, val) => onChange({ ...data, [key]: val })

  return (
    <div className="space-y-6 w-full">
      {FIELDS.map((f, i) => (
        <div key={f.key} className="input-underline border-b border-white/20 pb-2">
          <label className="block text-white/30 text-xs tracking-widest uppercase mb-2 font-medium">
            {f.label}
          </label>
          <input
            ref={i === 0 ? firstRef : undefined}
            type={f.type}
            value={data[f.key] || ''}
            onChange={e => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full bg-transparent text-white text-xl sm:text-2xl font-light outline-none placeholder:text-white/20 caret-brand-yellow"
            autoComplete={f.key === 'email' ? 'email' : 'off'}
          />
        </div>
      ))}
    </div>
  )
}
