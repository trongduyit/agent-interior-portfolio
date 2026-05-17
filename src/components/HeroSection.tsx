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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {showContent && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-sm md:text-base tracking-[0.3em] text-white/60 mb-4"
            >
              PREMIUM INTERIOR DESIGN
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 text-center"
            >
              {'AGENT FOR INTERIOR DESIGN'.split(' ').map((word, i, arr) => (
                <span key={`hero-word-${word}`} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {word}
                  </motion.span>
                  {i < arr.length - 1 && ' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-inter text-lg md:text-xl text-white/80 max-w-2xl"
            >
              Transforming spaces into extraordinary environments
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-10 px-8 py-4 border border-white/30 text-white font-inter text-sm tracking-widest hover:bg-white/10 transition-colors"
            >
              EXPLORE PORTFOLIO
            </motion.button>
          </>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center text-white/60 cursor-pointer"
        >
          <span className="text-xs font-inter tracking-widest mb-2">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      <div
        className={`absolute z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#d4af37] w-8' : 'bg-white/40 w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}