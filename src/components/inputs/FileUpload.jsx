import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FileUpload({ question, value, onChange }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()
  const files = value || []

  const addFiles = (newFiles) => {
    const list = Array.from(newFiles).map(f => ({ name: f.name, size: f.size, type: f.type }))
    onChange([...files, ...list])
  }

  const remove = (i) => onChange(files.filter((_, idx) => idx !== i))

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  const fmt = (bytes) => bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-none p-10 text-center cursor-pointer transition-colors duration-200 ${
          dragging ? 'border-brand-yellow bg-brand-yellow/5' : 'border-white/20 hover:border-white/40'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={question.accept}
          multiple={question.multiple}
          className="hidden"
          onChange={e => e.target.files?.length && addFiles(e.target.files)}
        />
        <p className="text-white/50 text-base">
          Datei(en) hier reinziehen<br />
          <span className="text-white/30 text-sm">oder klicken zum Auswählen</span>
        </p>
        <p className="text-white/20 text-xs mt-2">{question.accept?.replace(/,/g, ' ')}</p>
      </div>

      <AnimatePresence>
        {files.map((f, i) => (
          <motion.div
            key={`${f.name}-${i}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10"
          >
            <div>
              <p className="text-white text-sm font-medium">{f.name}</p>
              <p className="text-white/30 text-xs">{fmt(f.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none ml-4"
              aria-label="Entfernen"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {files.length > 0 && (
        <p className="text-white/30 text-xs">
          Hinweis: Dateien werden lokal zwischengespeichert. Upload erfolgt beim Absenden.
        </p>
      )}
    </div>
  )
}
