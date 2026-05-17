'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const heroSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=1080&fit=crop',
    alt: 'Luxury living room interior',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop',
    alt: 'Modern kitchen design',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    alt: 'Executive office space',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&h=1080&fit=crop',
    alt: 'Spa bathroom design',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
    alt: 'Villa entrance',
  },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const { scrollY } = useScroll()

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    setShowContent(true)
  }, [])

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isHovered, nextSlide])

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroSlides[currentIndex].image})`,
              y: backgroundY,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {showContent && (
          <>
            {/* Main Brand Name - London Design Group Style */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-cormorant text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-[0.15em] mb-2"
            >
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] via-[#d4af37] to-[#f5e6a3] bg-clip-text text-transparent" style={{ textShadow: '0 0 60px rgba(212, 175, 55, 0.3)' }}>
                TRÂM HUỲNH
              </span>
            </motion.h1>

            {/* Tagline with elegant styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6 mb-12"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
              <span className="font-cormorant text-sm md:text-base tracking-[0.4em] text-[#d4af37] uppercase">
                Interior Design Studio
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-cormorant text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl italic"
            >
              Creating extraordinary spaces that inspire and elevate
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-12 px-10 py-4 border border-[#d4af37] text-[#d4af37] font-cormorant text-base tracking-[0.2em] uppercase hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-500"
            >
              View Our Work
            </motion.button>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center text-white/50 cursor-pointer"
        >
          <span className="text-xs font-cormorant tracking-[0.3em] mb-2">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div
        className={`absolute z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-0.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'w-8 bg-[#d4af37]' : 'w-4 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}