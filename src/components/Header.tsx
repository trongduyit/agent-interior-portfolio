'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Trang chủ', href: '#hero' },
  { name: 'Giới thiệu', href: '#about' },
  { name: 'Dự án', href: '#projects' },
  { name: 'Giải pháp', href: '#services' },
  { name: 'Blog', href: '#testimonials' },
  { name: 'Liên hệ', href: '#contact' },
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
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <span className="relative font-cormorant text-2xl md:text-3xl font-semibold tracking-wider">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#d4af37] bg-clip-text text-transparent">
                Trâm Huỳnh
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.8, ease: 'easeInOut' }}
              />
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="relative font-inter text-sm tracking-wide text-white/80 hover:text-white transition-colors duration-300 group overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-px bg-[#d4af37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden lg:block px-6 py-2.5 border border-[#d4af37] text-[#d4af37] font-inter text-sm tracking-wider hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
          >
            LIÊN HỆ NGAY
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <motion.span
                className="absolute left-0 w-full h-0.5 bg-white rounded-full"
                animate={{
                  top: isMobileMenuOpen ? '50%' : '0',
                  rotate: isMobileMenuOpen ? 45 : 0,
                  translateY: isMobileMenuOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 w-full h-0.5 bg-white rounded-full -translate-y-1/2"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scaleX: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 bottom-0 w-full h-0.5 bg-white rounded-full"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-lg border-t border-white/10"
          >
            <nav className="flex flex-col py-6 px-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="py-4 font-inter text-lg text-white/80 hover:text-[#d4af37] transition-colors duration-300 border-b border-white/5"
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
                className="mt-6 px-6 py-3 bg-[#d4af37] text-[#0a0a0a] font-inter text-center tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                LIÊN HỆ NGAY
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}