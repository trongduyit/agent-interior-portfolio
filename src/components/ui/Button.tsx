'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 font-inter font-semibold px-8 py-3 rounded-lg transition-all duration-300 disabled:opacity-50',
        variant === 'primary' && 'bg-secondary text-primary hover:bg-[#B8954D] hover:-translate-y-0.5 hover:shadow-lg',
        variant === 'secondary' && 'border border-secondary text-secondary hover:bg-secondary hover:text-primary',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}