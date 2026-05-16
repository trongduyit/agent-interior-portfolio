'use client'

import { motion } from 'framer-motion'
import { services } from '@/data/services'
import ServiceCard from './ServiceCard'

export default function ServicesSection() {
  return (
    <section id="services" className="min-h-screen w-full bg-surface py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">Our Services</h2>
          <p className="font-inter text-text-secondary max-w-2xl mx-auto">
            Comprehensive interior design solutions tailored to your unique vision and requirements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}