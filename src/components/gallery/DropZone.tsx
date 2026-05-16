'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxSizeMB?: number
  disabled?: boolean
  accept?: string
}

export default function DropZone({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 5,
  disabled = false,
  accept = 'image/*',
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFiles = useCallback(
    (files: File[]): File[] => {
      setError(null)
      const validFiles: File[] = []
      const maxSizeBytes = maxSizeMB * 1024 * 1024

      for (const file of files) {
        if (file.size > maxSizeBytes) {
          setError(`File "${file.name}" exceeds ${maxSizeMB}MB limit`)
          continue
        }
        if (!file.type.startsWith('image/')) {
          setError(`File "${file.name}" is not an image`)
          continue
        }
        validFiles.push(file)
      }

      return validFiles.slice(0, maxFiles)
    },
    [maxFiles, maxSizeMB]
  )

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return
      const files = Array.from(fileList)
      const validFiles = validateFiles(files)
      if (validFiles.length > 0) {
        onFilesSelected(validFiles)
      }
    },
    [validateFiles, onFilesSelected]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragging(true)
      }
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (disabled) return

      const dt = e.dataTransfer
      if (dt?.files) {
        handleFiles(dt.files)
      }
    },
    [disabled, handleFiles]
  )

  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }, [disabled])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      // Reset input so same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    [handleFiles]
  )

  return (
    <div className="w-full">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        animate={{
          borderColor: isDragging ? '#B8954D' : error ? '#ef4444' : '#e5e5e5',
          backgroundColor: isDragging ? 'rgba(184, 149, 77, 0.05)' : 'transparent',
        }}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              scale: isDragging ? 1.1 : 1,
              backgroundColor: isDragging ? 'rgba(184, 149, 77, 0.1)' : 'rgba(184, 149, 77, 0.1)',
            }}
            className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center"
          >
            {isDragging ? (
              <ImageIcon className="w-8 h-8 text-secondary" />
            ) : (
              <Upload className="w-8 h-8 text-secondary" />
            )}
          </motion.div>

          <div>
            <p className="font-inter text-primary font-medium">
              {isDragging ? 'Drop images here' : 'Drag & drop images or click to browse'}
            </p>
            <p className="font-inter text-sm text-text-secondary mt-1">
              Max {maxFiles} images, up to {maxSizeMB}MB each
            </p>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-red-500 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setError(null)
              }}
              className="ml-1 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}