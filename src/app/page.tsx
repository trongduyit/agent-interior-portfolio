'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Header from '@/components/Header'
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
        <Header />
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