'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImagePreviewProps {
  file: File
  url?: string
  status: 'uploading' | 'success' | 'error'
  progress: number
  onRemove: () => void
}

export default function ImagePreview({
  file,
  url,
  status,
  progress,
  onRemove,
}: ImagePreviewProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const previewUrl = url || (file ? URL.createObjectURL(file) : null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        'relative aspect-square rounded-lg overflow-hidden bg-gray-100',
        status === 'error' && 'ring-2 ring-red-500'
      )}
    >
      {previewUrl && !imageError ? (
        <Image
          src={previewUrl}
          alt={file.name}
          fill
          className={cn(
            'object-cover transition-opacity duration-300',
            !imageLoaded && 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-xs text-gray-500 truncate px-2">{file.name}</span>
        </div>
      )}

      {/* Status overlay */}
      {status === 'uploading' && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <Loader className="w-6 h-6 text-white animate-spin mb-2" />
          <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white text-xs mt-1">{progress}%</span>
        </div>
      )}

      {status === 'success' && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />
        </div>
      )}

      {status === 'error' && (
        <div className="absolute top-2 right-2">
          <AlertCircle className="w-5 h-5 text-red-500 bg-white rounded-full" />
        </div>
      )}

      {/* Remove button */}
      <button
        onClick={onRemove}
        className={cn(
          'absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center transition-opacity',
          status === 'uploading'
            ? 'bg-white/50 hover:bg-white/70 text-gray-600'
            : 'bg-white/70 hover:bg-red-500 hover:text-white text-gray-600'
        )}
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}