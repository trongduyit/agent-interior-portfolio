'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '85+', label: 'Projects Completed' },
  { value: '50+', label: 'Happy Clients' },
]

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen w-full bg-background py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto h-full grid md:grid-cols-[2fr_3fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div className="absolute inset-0 rounded-full bg-secondary/20 -z-10 top-4 left-4" />
            <Image
              src="/images/about-photo.jpg"
              alt="Interior Designer"
              fill
              className="object-cover rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div>
            <h2 className="section-heading mb-2">Your Name</h2>
            <p className="font-inter text-secondary font-medium">Senior Interior Designer</p>
          </div>

          <blockquote className="font-cormorant text-2xl md:text-3xl italic text-text-primary leading-relaxed">
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>
          <p className="font-inter text-text-secondary leading-relaxed">
            With over a decade of experience in luxury interior design, we transform spaces into
            extraordinary environments that inspire and elevate everyday living. Our philosophy
            combines timeless elegance with modern functionality, creating spaces that are both
            beautiful and purpose-driven.
          </p>

          <div className="flex flex-wrap gap-8 pt-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-playfair text-4xl font-bold text-primary">{stat.value}</div>
                <div className="font-inter text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}