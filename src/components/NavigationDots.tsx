'use client'

import { cn } from '@/lib/utils'

interface NavigationDotsProps {
  sections: readonly string[]
  activeIndex: number
  onNavigate: (index: number) => void
}

export default function NavigationDots({ sections, activeIndex, onNavigate }: NavigationDotsProps) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => onNavigate(index)}
          className={cn(
            'w-2.5 h-2.5 rounded-full border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-secondary/40',
            index === activeIndex
              ? 'bg-secondary border-secondary scale-110'
              : 'border-text-secondary hover:border-secondary hover:scale-110'
          )}
          aria-label={`Go to ${section} section`}
        />
      ))}
    </nav>
  )
}