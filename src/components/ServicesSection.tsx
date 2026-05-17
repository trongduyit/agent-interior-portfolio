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