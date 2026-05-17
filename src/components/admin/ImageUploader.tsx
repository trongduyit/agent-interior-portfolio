'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import DropZone from '@/components/gallery/DropZone'
import ImagePreview from '@/components/ui/ImagePreview'
import { Upload, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadingFile {
  id: string
  file: File
  status: 'uploading' | 'success' | 'error'
  progress: number
  url?: string
}

interface ImageUploaderProps {
  projectId: string
  onUploadComplete?: (urls: string[]) => void
  maxFiles?: number
}

export default function ImageUploader({
  projectId,
  onUploadComplete,
  maxFiles = 8,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<UploadingFile[]>([])

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    const newFiles: UploadingFile[] = selectedFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      status: 'uploading',
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles].slice(0, maxFiles))

    // Simulate upload - in production, use Cloudinary API
    newFiles.forEach((f) => {
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((file) => {
            if (file.id === f.id) {
              const newProgress = Math.min(file.progress + 20, 100)
              return {
                ...file,
                progress: newProgress,
                status: newProgress === 100 ? 'success' : 'uploading',
                url: URL.createObjectURL(file.file),
              }
            }
            return file
          })
        )
        if (f.progress >= 100) {
          clearInterval(interval)
        }
      }, 500)
    })
  }, [maxFiles])

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleUploadComplete = useCallback(() => {
    const urls = files.filter((f) => f.status === 'success').map((f) => f.url!)
    onUploadComplete?.(urls)
  }, [files, onUploadComplete])

  return (
    <div className="w-full bg-surface rounded-xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <FolderOpen className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold text-primary">
            Upload Project Images
          </h3>
          <p className="font-inter text-sm text-text-secondary">
            For {projectId} • Max {maxFiles} images
          </p>
        </div>
      </div>

      <DropZone
        onFilesSelected={handleFilesSelected}
        maxFiles={maxFiles}
        maxSizeMB={10}
        disabled={files.length >= maxFiles}
      />

      {files.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((f) => (
              <ImagePreview
                key={f.id}
                file={f.file}
                url={f.url}
                status={f.status}
                progress={f.progress}
                onRemove={() => handleRemove(f.id)}
              />
            ))}
          </div>

          {files.some((f) => f.status === 'success') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-end"
            >
              <button
                onClick={handleUploadComplete}
                className={cn(
                  'flex items-center gap-2 bg-secondary text-primary font-inter font-semibold',
                  'px-6 py-3 rounded-lg hover:bg-[#B8954D] transition-colors'
                )}
              >
                <Upload className="w-5 h-5" />
                Save to Project
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}