'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent! (Demo mode)')
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      className="min-h-screen w-full relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#fafafa]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-sm tracking-[0.2em] text-[#d4af37] mb-2">CONTACT</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Let&apos;s Create Together
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <FloatingLabelInput
              label="Your Name"
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
            <FloatingLabelInput
              label="Email Address"
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />
            <FloatingLabelTextarea
              label="Your Message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            />

            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#00f0ff] text-[#0a0a0a] font-inter font-bold tracking-widest rounded-lg hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SEND MESSAGE
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function FloatingLabelInput({
  label,
  type,
  value,
  onChange,
}: {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-inter focus:outline-none focus:border-[#d4af37] transition-colors"
        placeholder=" "
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFocused || hasValue
            ? 'top-2 text-xs text-[#d4af37]'
            : 'top-4 text-base text-white/50'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingLabelTextarea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={5}
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-inter focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
        placeholder=" "
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFocused || hasValue
            ? 'top-2 text-xs text-[#d4af37]'
            : 'top-4 text-base text-white/50'
        }`}
      >
        {label}
      </label>
    </div>
  )
}