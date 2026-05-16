'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Testimonial } from '@/data/testimonials'

interface TestimonialSlideProps {
  testimonial: Testimonial
}

export default function TestimonialSlide({ testimonial }: TestimonialSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center px-8 md:px-16"
    >
      <blockquote className="font-playfair text-3xl md:text-4xl lg:text-5xl font-normal italic text-white leading-relaxed mb-8">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={testimonial.clientPhoto}
            alt={testimonial.clientName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-inter font-semibold text-white">{testimonial.clientName}</div>
          <div className="font-inter text-sm text-white/60">{testimonial.project}</div>
        </div>
      </div>
    </motion.div>
  )
}