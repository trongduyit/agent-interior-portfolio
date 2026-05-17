'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '85+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="min-h-screen w-full bg-[#fafafa] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#00f0ff]/10 -z-10 top-4 left-4" />
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop"
                alt="Interior Designer"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="font-inter text-sm tracking-[0.2em] text-[#d4af37] mb-2">ABOUT US</p>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2d2d]">
                Your Vision, <br />Our Expertise
              </h2>
            </div>

            <blockquote className="font-cormorant text-xl md:text-2xl lg:text-3xl italic text-[#6b6b6b] leading-relaxed border-l-2 border-[#d4af37] pl-6">
              "Design is not just what it looks like and feels like. Design is how it works."
            </blockquote>

            <p className="font-inter text-[#6b6b6b] leading-relaxed text-base md:text-lg">
              With over a decade of experience in luxury interior design, we transform spaces into
              extraordinary environments that inspire and elevate everyday living. Our philosophy
              combines timeless elegance with modern functionality, creating spaces that are both
              beautiful and purpose-driven.
            </p>

            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#d4af37] to-[#00f0ff] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="font-inter text-sm text-[#6b6b6b] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}