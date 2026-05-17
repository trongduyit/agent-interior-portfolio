'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Journal', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo - TH Monogram */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 group"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="url(#headerGradient)"
                strokeWidth="0.75"
              />
              <text
                x="18"
                y="22"
                textAnchor="middle"
                fill="url(#headerGradient)"
                fontSize="11"
                fontFamily="Cormorant, serif"
                fontWeight="300"
                letterSpacing="2"
              >
                TH
              </text>
              <defs>
                <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#f5e6a3" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col">
              <span className="font-cormorant text-lg tracking-[0.15em] text-white/90 group-hover:text-white transition-colors">
                TRÂM HUỲNH
              </span>
              <span className="font-cormorant text-[9px] tracking-[0.3em] text-[#d4af37]/70 uppercase">
                Interior Design
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation - Minimal & Elegant */}
          <motion.nav
            className="hidden lg:flex items-center gap-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="relative font-cormorant text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors duration-300 py-2 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.nav>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contact')
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block px-6 py-2.5 border border-[#d4af37]/60 text-[#d4af37] font-cormorant text-sm tracking-[0.15em] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
          >
            ENQUIRE
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <motion.span
                className="absolute left-0 w-full h-px bg-white rounded-full"
                animate={{
                  top: isMobileMenuOpen ? '50%' : '0',
                  rotate: isMobileMenuOpen ? 45 : 0,
                  translateY: isMobileMenuOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 w-full h-px bg-white rounded-full -translate-y-1/2"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scaleX: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 bottom-0 w-full h-px bg-white rounded-full"
                animate={{
                  bottom: isMobileMenuOpen ? '50%' : '0',
                  rotate: isMobileMenuOpen ? -45 : 0,
                  translateY: isMobileMenuOpen ? '50%' : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-lg border-t border-white/10"
          >
            <nav className="flex flex-col py-8 px-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="py-4 font-cormorant text-xl tracking-[0.2em] text-white/80 hover:text-[#d4af37] transition-colors duration-300 border-b border-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#contact')
                }}
                className="mt-8 px-6 py-3 border border-[#d4af37] text-[#d4af37] font-cormorant text-center tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                ENQUIRE
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}