'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { testimonials } from '@/data/testimonials'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="min-h-screen w-full bg-[#0a0a0a] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-sm tracking-[0.2em] text-[#00f0ff] mb-2">TESTIMONIALS</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Client Stories
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Quote mark */}
              <div className="absolute -top-4 -left-4 font-playfair text-8xl text-[#d4af37]/20">
                &quot;
              </div>

              <div className="relative bg-[#1a1a1a] rounded-2xl p-8 md:p-12">
                <p className="font-cormorant text-xl md:text-2xl lg:text-3xl italic text-white/90 leading-relaxed mb-8">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#00f0ff]/30">
                    <Image
                      src={testimonials[currentIndex].clientPhoto}
                      alt={testimonials[currentIndex].clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-playfair text-lg font-bold text-white">
                      {testimonials[currentIndex].clientName}
                    </p>
                    <p className="font-inter text-sm text-[#00f0ff]">
                      {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#00f0ff] w-8'
                    : 'bg-white/30 w-4 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}