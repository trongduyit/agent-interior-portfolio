'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="relative aspect-[4/3] rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-secondary/40"
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
        <span className="text-white font-inter font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Project
        </span>
      </div>
    </motion.button>
  )
}