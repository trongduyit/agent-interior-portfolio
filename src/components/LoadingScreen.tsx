'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 500)
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <h1 className="font-cormorant text-5xl md:text-7xl font-semibold tracking-wider mb-2">
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#d4af37] bg-clip-text text-transparent">
              Trâm Huỳnh
            </span>
          </h1>
          <p className="font-cormorant text-lg md:text-xl tracking-[0.3em] text-white/60">Interior</p>
        </motion.div>

        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#00f0ff]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 font-inter text-white/30 text-xs"
        >
          {progress}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}