'use client'

import { motion } from 'framer-motion'
import { Palette, Hammer, MessageCircle, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Hammer,
  MessageCircle,
}

interface ServiceCardProps {
  id: string
  icon: string
  title: string
  description: string
  index: number
}

export default function ServiceCard({ id, icon, title, description, index }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Palette

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={cn(
        'bg-surface p-8 rounded-xl border border-gray-100 shadow-sm',
        'transition-all duration-300 hover:shadow-lg hover:border-l-4 hover:border-l-secondary'
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
        <IconComponent className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-playfair text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="font-inter text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  )
}