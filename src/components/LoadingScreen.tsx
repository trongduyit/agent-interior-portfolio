'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    const completeTimer = setTimeout(() => {
      setIsAnimating(false)
      setTimeout(onComplete, 800)
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
          }}
        >
          {/* Logo Container */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo Icon - Elegant TH Monogram */}
            <motion.div
              className="mb-10 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                className="relative z-10"
              >
                {/* Outer Circle */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="none"
                  stroke="url(#loadingGradient)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                {/* Inner Circle */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="url(#loadingGradient)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
                />
                {/* TH Text */}
                <motion.text
                  x="40"
                  y="46"
                  textAnchor="middle"
                  fill="url(#loadingGradient)"
                  fontSize="24"
                  fontFamily="Cormorant, serif"
                  fontWeight="300"
                  letterSpacing="4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  TH
                </motion.text>
                <defs>
                  <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#f5e6a3" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <h1 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] text-white mb-2">
                TRÂM HUỲNH
              </h1>
              <p className="font-cormorant text-xs md:text-sm tracking-[0.5em] text-[#d4af37] uppercase">
                Interior Design Studio
              </p>
            </motion.div>

            {/* Decorative Lines */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
              <div className="w-2 h-2 border border-[#d4af37] rotate-45" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
            </motion.div>
          </motion.div>

          {/* Loading Bar - Minimal Line */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="relative h-px bg-white/10">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#d4af37] to-[#f5e6a3]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="mt-3 text-center">
              <span className="font-cormorant text-xs tracking-[0.3em] text-white/40">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Corner Accents */}
          <div className="absolute top-6 left-6 right-6 bottom-6 pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-px bg-[#d4af37]/40" />
            <div className="absolute top-0 left-0 w-px h-8 bg-[#d4af37]/40" />
            <div className="absolute top-0 right-0 w-8 h-px bg-[#d4af37]/40" />
            <div className="absolute top-0 right-0 w-px h-8 bg-[#d4af37]/40" />
            <div className="absolute bottom-0 left-0 w-8 h-px bg-[#d4af37]/40" />
            <div className="absolute bottom-0 left-0 w-px h-8 bg-[#d4af37]/40" />
            <div className="absolute bottom-0 right-0 w-8 h-px bg-[#d4af37]/40" />
            <div className="absolute bottom-0 right-0 w-px h-8 bg-[#d4af37]/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}