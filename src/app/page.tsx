'use client'

import { useState } from 'react'
import NavigationDots from '@/components/NavigationDots'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

const sections = [
  'hero',
  'about',
  'services',
  'projects',
  'testimonials',
  'contact',
] as const

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)

  return (
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
      <ContactSection />
      <Footer />
    </main>
  )
}