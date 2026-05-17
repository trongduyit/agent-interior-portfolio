'use client'

import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
}

export default function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: delay + i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  }

  const word = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  }

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((wordText, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={word}
            custom={index}
          >
            {wordText}
          </motion.span>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </motion.div>
  )
}