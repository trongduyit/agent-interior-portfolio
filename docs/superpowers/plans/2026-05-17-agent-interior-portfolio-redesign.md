# Agent for Interior Design - Immersive Portfolio Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign portfolio thành immersive cinematic experience với full animations, parallax effects, scroll snap navigation, và premium dark luxe + light airy fusion aesthetic.

**Architecture:** Single-page với scroll-snap sections, Framer Motion cho animations, custom cursor, loading screen, và split-text reveals. Mỗi section có visual identity riêng nhưng thống nhất trong flow.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scroll

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "@studio-freight/lenis": "^1.0.0"
  }
}
```

- [ ] **Step 1: Install framer-motion and lenis**

Run: `cd "D:/Interior Design/agent-interior-portfolio" && npm install framer-motion @studio-freight/lenis`

Expected: packages installed successfully

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add package.json package-lock.json
git commit -m "feat: add framer-motion and lenis for animations

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 2: Create LoadingScreen Component

**Files:**
- Create: `src/components/LoadingScreen.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create LoadingScreen.tsx**

```tsx
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
          <h1 className="font-playfair text-6xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f0d875] to-[#d4af37] bg-clip-text text-transparent mb-8">
            AID
          </h1>
          <p className="font-inter text-white/40 text-sm tracking-widest mb-6">LOADING</p>
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
```

- [ ] **Step 2: Modify page.tsx to use LoadingScreen**

```tsx
'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import NavigationDots from '@/components/NavigationDots'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import VisitorGallery from '@/components/gallery/VisitorGallery'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

const sections = [
  'hero',
  'about',
  'services',
  'projects',
  'testimonials',
  'gallery',
  'contact',
] as const

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <main className="relative">
        <NavigationDots
          sections={sections}
          activeIndex={activeSection}
          onNavigate={setActiveSection}
        />

        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <VisitorGallery />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/LoadingScreen.tsx src/app/page.tsx
git commit -m "feat: add LoadingScreen component with animated logo and progress bar

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 3: Create CustomCursor Component

**Files:**
- Create: `src/components/ui/CustomCursor.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create CustomCursor.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', moveCursor)

    const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => setIsHovering(true))
      el.addEventListener('mouseleave', () => setIsHovering(false))
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY, isVisible])

  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
```

- [ ] **Step 2: Modify layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'Agent for Interior Design | Premium Portfolio',
  description: 'Luxury interior design portfolio showcasing premium spaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-inter antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/ui/CustomCursor.tsx src/app/layout.tsx
git commit -m "feat: add CustomCursor component with dot and ring effect

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 4: Create SplitText Component

**Files:**
- Create: `src/components/ui/SplitText.tsx`

- [ ] **Step 1: Create SplitText.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/ui/SplitText.tsx
git commit -m "feat: add SplitText component for animated text reveals

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 5: Integrate Lenis Smooth Scroll

**Files:**
- Create: `src/lib/smooth-scroll.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create smooth-scroll.ts**

```ts
import Lenis from '@studio-freight/lenis'

export default function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1 - Math.pow(1 - t, 3), 0.9),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}
```

- [ ] **Step 2: Create SmoothScrollProvider.tsx**

```tsx
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1 - Math.pow(1 - t, 3), 0.9),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 3: Modify layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Agent for Interior Design | Premium Portfolio',
  description: 'Luxury interior design portfolio showcasing premium spaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-inter antialiased bg-background text-text-primary">
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/lib/smooth-scroll.ts src/components/SmoothScrollProvider.tsx src/app/layout.tsx
git commit -m "feat: add Lenis smooth scroll integration

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 6: Redo HeroSection with Split-Text and Parallax

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Write new HeroSection.tsx**

```tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import SplitText from './ui/SplitText'

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
  const { scrollY } = useScroll()

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-sm md:text-base tracking-[0.3em] text-white/60 mb-4"
        >
          PREMIUM INTERIOR DESIGN
        </motion.p>

        <SplitText
          text="AGENT FOR INTERIOR DESIGN"
          className="font-playfair text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 text-center"
          delay={0.4}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-inter text-lg md:text-xl text-white/80 max-w-2xl"
        >
          Transforming spaces into extraordinary environments
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 px-8 py-4 border border-white/30 text-white font-inter text-sm tracking-widest hover:bg-white/10 transition-colors"
        >
          EXPLORE PORTFOLIO
        </motion.button>
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
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/HeroSection.tsx
git commit -m "feat: enhance HeroSection with split-text reveal and parallax effect

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 7: Redo AboutSection with Scroll Animations

**Files:**
- Modify: `src/components/AboutSection.tsx`

- [ ] **Step 1: Write new AboutSection.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/AboutSection.tsx
git commit -m "feat: enhance AboutSection with scroll-triggered animations and gradient stats

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 8: Redo ServicesSection with 3D Card Hover

**Files:**
- Modify: `src/components/ServicesSection.tsx`

- [ ] **Step 1: Write new ServicesSection.tsx**

```tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, PenTool, HardHat } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Consultation',
    description:
      'We begin with understanding your vision, lifestyle, and requirements through in-depth discussions to create a tailored design strategy.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description:
      'Our team crafts detailed 3D visualizations and material palettes, presenting multiple concepts until we achieve your perfect space.',
  },
  {
    icon: HardHat,
    title: 'Execution',
    description:
      'We manage every detail of the build process, coordinating contractors and overseeing installation to ensure flawless execution.',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="min-h-screen w-full bg-[#1a1a1a] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-inter text-sm tracking-[0.2em] text-[#00f0ff] mb-2">OUR SERVICES</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            End-to-End Excellence
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0]
  index: number
  isInView: boolean
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="perspective-1000"
    >
      <div
        className="relative bg-[#0a0a0a] rounded-xl p-8 cursor-pointer transition-all duration-300"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(0, 240, 255, 0.15)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`absolute inset-0 rounded-xl border transition-duration-300 ${
            isHovered ? 'border-[#00f0ff]/50' : 'border-white/5'
          }`}
          style={{ transform: 'translateZ(20px)' }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
              isHovered ? 'bg-[#00f0ff]/20' : 'bg-[#d4af37]/10'
            }`}
          >
            <Icon
              className={`w-8 h-8 transition-colors duration-300 ${
                isHovered ? 'text-[#00f0ff]' : 'text-[#d4af37]'
              }`}
            />
          </div>

          <h3 className="font-playfair text-2xl font-bold text-white mb-4">{service.title}</h3>

          <p className="font-inter text-white/60 leading-relaxed">{service.description}</p>

          <div
            className={`mt-6 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#00f0ff] transition-all duration-300 ${
              isHovered ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/ServicesSection.tsx
git commit -m "feat: enhance ServicesSection with 3D tilt card hover effects

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 9: Create Lightbox Component

**Files:**
- Create: `src/components/ui/Lightbox.tsx`

- [ ] **Step 1: Create Lightbox.tsx**

```tsx
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl max-h-[80vh] mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 py-4 text-center">
              <p className="font-inter text-white/60 text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/ui/Lightbox.tsx
git commit -m "feat: add Lightbox component for fullscreen image viewing

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 10: Redo ProjectsSection with Zoom and Lightbox

**Files:**
- Modify: `src/components/ProjectsSection.tsx`

- [ ] **Step 1: Write new ProjectsSection.tsx**

```tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Lightbox from './ui/Lightbox'
import { projects, filterOptions, FilterType } from '@/data/projects'

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.type === activeFilter)

  const projectImages = filteredProjects.map((p) => p.image)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="projects" className="min-h-screen w-full bg-[#fafafa] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-inter text-sm tracking-[0.2em] text-[#d4af37] mb-2">PORTFOLIO</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2d2d]">
            Featured Projects
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 font-inter text-sm tracking-wider rounded-full transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-[#2d2d2d] text-white'
                  : 'bg-white text-[#6b6b6b] hover:bg-[#2d2d2d]/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => openLightbox(index)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      <Lightbox
        images={projectImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % projectImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)}
      />
    </section>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
  isInView,
}: {
  project: (typeof projects)[0]
  index: number
  onClick: () => void
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group cursor-pointer overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="font-inter text-xs tracking-widest text-[#d4af37] mb-2 uppercase">
            {project.type} / {project.style}
          </p>
          <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-1">
            {project.name}
          </h3>
          <p className="font-inter text-sm text-white/70">{project.area} sqm</p>
        </div>

        {/* Zoom icon */}
        <div
          className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/ProjectsSection.tsx
git commit -m "feat: enhance ProjectsSection with zoom hover effect and lightbox

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 11: Redo TestimonialsSection with Enhanced Carousel

**Files:**
- Modify: `src/components/TestimonialsSection.tsx`

- [ ] **Step 1: Write new TestimonialsSection.tsx**

```tsx
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
                "
              </div>

              <div className="relative bg-[#1a1a1a] rounded-2xl p-8 md:p-12">
                <p className="font-cormorant text-xl md:text-2xl lg:text-3xl italic text-white/90 leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
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
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/TestimonialsSection.tsx
git commit -m "feat: enhance TestimonialsSection with animated carousel

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 12: Redo ContactSection with Gradient Background

**Files:**
- Modify: `src/components/ContactSection.tsx`

- [ ] **Step 1: Write new ContactSection.tsx**

```tsx
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
            Let's Create Together
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
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/ContactSection.tsx
git commit -m "feat: enhance ContactSection with gradient bg and floating labels

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 13: Update Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Write new Footer.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import SocialIcon from './ui/SocialIcon'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="font-playfair text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f0d875] to-[#d4af37] bg-clip-text text-transparent">
              AID
            </h3>
            <p className="font-inter text-sm text-white/40 mt-1">
              Premium Interior Design
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
            <SocialIcon href="#" label="Facebook" />
            <SocialIcon href="#" label="Instagram" />
            <SocialIcon href="#" label="Pinterest" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-inter text-xs text-white/30"
          >
            © 2026 Agent for Interior Design. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/components/Footer.tsx
git commit -m "feat: update Footer with gradient logo and minimal design

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 14: Update Global CSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

:root {
  --color-bg-dark: #0a0a0a;
  --color-bg-dark-gray: #1a1a1a;
  --color-bg-light: #fafafa;
  --color-gold: #d4af37;
  --color-neon: #00f0ff;
  --color-text-light: #ffffff;
  --color-text-dark: #2d2d2d;
  --color-text-secondary: #6b6b6b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--color-bg-dark);
  color: var(--color-text-light);
  overflow-x: hidden;
}

.font-playfair {
  font-family: 'Playfair Display', serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-cormorant {
  font-family: 'Cormorant Garamond', serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--color-gold);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-neon);
}

/* Perspective for 3D effects */
.perspective-1000 {
  perspective: 1000px;
}

/* Hide default cursor on custom cursor elements */
a,
button {
  cursor: pointer;
}

/* Smooth transitions for interactive elements */
a,
button,
input,
textarea {
  -webkit-tap-highlight-color: transparent;
}

/* Noise texture overlay (optional) */
.noise-overlay::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.03;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 2: Commit**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add src/app/globals.css
git commit -m "feat: update global CSS with custom fonts, scrollbar, and effects

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 15: Final Build and Deploy

**Files:**
- Modify: `src/app/page.tsx` (final check)

- [ ] **Step 1: Run build to verify everything works**

Run: `cd "D:/Interior Design/agent-interior-portfolio" && npm run build`

Expected: Build completes without errors

- [ ] **Step 2: Push changes to trigger deployment**

```bash
cd "D:/Interior Design/agent-interior-portfolio"
git add -A
git commit -m "feat: complete immersive portfolio redesign with full animations

- Loading screen with animated logo
- Custom cursor (dot + ring)
- Split-text hero with parallax
- 3D card hover effects
- Lightbox image viewer
- Enhanced animations throughout

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push origin main
```

- [ ] **Step 3: Verify deployment**

Check: https://trongduyit.github.io/agent-interior-portfolio/

---

## Summary

**13 Components/Files Modified:**
1. LoadingScreen.tsx (new)
2. CustomCursor.tsx (new)
3. SplitText.tsx (new)
4. SmoothScrollProvider.tsx (new)
5. Lightbox.tsx (new)
6. HeroSection.tsx (modified)
7. AboutSection.tsx (modified)
8. ServicesSection.tsx (modified)
9. ProjectsSection.tsx (modified)
10. TestimonialsSection.tsx (modified)
11. ContactSection.tsx (modified)
12. Footer.tsx (modified)
13. globals.css (modified)