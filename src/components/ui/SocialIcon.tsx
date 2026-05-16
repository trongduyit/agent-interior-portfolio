'use client'

import { cn } from '@/lib/utils'
import { Instagram, Facebook, Linkedin, PinIcon as Pinterest } from 'lucide-react'

type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'pinterest'

interface SocialIconProps {
  platform: SocialPlatform
  className?: string
}

const icons: Record<SocialPlatform, React.ReactNode> = {
  instagram: <Instagram className="w-6 h-6" />,
  facebook: <Facebook className="w-6 h-6" />,
  linkedin: <Linkedin className="w-6 h-6" />,
  pinterest: <Pinterest className="w-6 h-6" />,
}

export default function SocialIcon({ platform, className }: SocialIconProps) {
  return (
    <a
      href="#"
      className={cn(
        'text-text-secondary hover:text-secondary transition-colors duration-200',
        className
      )}
      aria-label={platform}
    >
      {icons[platform]}
    </a>
  )
}