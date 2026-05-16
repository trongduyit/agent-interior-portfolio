'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { projects, filterOptions, type FilterType } from '@/data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'all' || p.type === activeFilter
  )

  const featuredProject = filteredProjects[featuredIndex] || filteredProjects[0]

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1

  const handlePrev = useCallback(() => {
    if (selectedIndex <= 0) {
      setSelectedProject(filteredProjects[filteredProjects.length - 1])
    } else {
      setSelectedProject(filteredProjects[selectedIndex - 1])
    }
  }, [selectedIndex, filteredProjects])

  const handleNext = useCallback(() => {
    if (selectedIndex >= filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[0])
    } else {
      setSelectedProject(filteredProjects[selectedIndex + 1])
    }
  }, [selectedIndex, filteredProjects])

  return (
    <section id="projects" className="min-h-screen w-full bg-background py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-4">Our Projects</h2>
          <p className="font-inter text-text-secondary max-w-2xl mx-auto">
            Explore our portfolio of stunning interior design projects across various styles and spaces
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden group"
          >
            {featuredProject && (
              <>
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                    style={{
                      backgroundColor:
                        featuredProject.type === 'office'
                          ? 'rgba(59, 130, 246, 0.8)'
                          : featuredProject.type === 'shophouse'
                          ? 'rgba(34, 197, 94, 0.8)'
                          : 'rgba(147, 51, 234, 0.8)',
                    }}
                  >
                    {featuredProject.type.charAt(0).toUpperCase() +
                      featuredProject.type.slice(1)}
                  </span>
                  <h3 className="font-playfair text-3xl font-semibold mb-1">
                    {featuredProject.name}
                  </h3>
                  <p className="font-inter text-sm text-white/70">
                    {featuredProject.area}m² • {featuredProject.style.replace('-', ' ')}
                  </p>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === option.value
                      ? 'bg-secondary text-primary'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  )
}