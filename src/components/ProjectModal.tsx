'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ProjectModal({ project, isOpen, onClose, onPrev, onNext }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] bg-surface rounded-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto">
              <Image src={project.image} alt={project.name} fill className="object-cover" />
            </div>

            <div className="flex-1 p-8 flex flex-col justify-center">
              <span
                className={cn(
                  'inline-block px-3 py-1 rounded-full text-xs font-medium mb-4',
                  project.type === 'office' && 'bg-blue-100 text-blue-700',
                  project.type === 'shophouse' && 'bg-green-100 text-green-700',
                  project.type === 'villa' && 'bg-purple-100 text-purple-700'
                )}
              >
                {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
              </span>
              <h3 className="font-playfair text-3xl font-semibold text-primary mb-2">{project.name}</h3>
              <p className="font-inter text-sm text-text-secondary mb-4">
                {project.area}m² • {project.style.replace('-', ' ')}
              </p>
              <p className="font-inter text-text-primary leading-relaxed">{project.description}</p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-primary hover:bg-white transition-colors hidden md:flex"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-primary hover:bg-white transition-colors hidden md:flex"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}