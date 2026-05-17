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