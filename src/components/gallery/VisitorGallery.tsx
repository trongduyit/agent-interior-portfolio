'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import DropZone from '@/components/gallery/DropZone'
import ImagePreview from '@/components/ui/ImagePreview'
import { Images, X, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GalleryImage } from '@/lib/types'
import { getGalleryImages, addGalleryImage, sampleGalleryImages } from '@/data/gallery'

export default function VisitorGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploadingFiles, setUploadingFiles] = useState<{ id: string; file: File; status: string; progress: number; url?: string }[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    // Load from localStorage or use sample images
    const stored = getGalleryImages()
    setImages(stored.length > 0 ? stored : sampleGalleryImages)
  }, [])

  const handleFilesSelected = useCallback((files: File[]) => {
    const newFiles = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      status: 'uploading',
      progress: 0,
    }))

    setUploadingFiles((prev) => [...prev, ...newFiles])

    // Simulate upload
    newFiles.forEach((f) => {
      const interval = setInterval(() => {
        setUploadingFiles((prev) =>
          prev.map((file) => {
            if (file.id === f.id) {
              const newProgress = Math.min(file.progress + 25, 100)
              if (newProgress === 100) {
                clearInterval(interval)
                const url = URL.createObjectURL(file.file)
                const galleryImage: GalleryImage = {
                  id: file.id,
                  url,
                  thumbnailUrl: url,
                  publicId: file.id,
                  createdAt: new Date().toISOString(),
                  uploadedBy: 'visitor',
                }
                addGalleryImage(galleryImage)
                setImages((prev) => [galleryImage, ...prev])
              }
              return { ...file, progress: newProgress, status: newProgress === 100 ? 'success' : 'uploading', url }
            }
            return file
          })
        )
      }, 300)
    })
  }, [])

  const handleRemoveUpload = useCallback((id: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  return (
    <section id="gallery" className="min-h-screen w-full bg-background py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-4">Visitor Gallery</h2>
          <p className="font-inter text-text-secondary max-w-2xl mx-auto">
            Share your interior design inspiration &bull; Upload your own photos
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className={cn(
              'flex items-center gap-2 font-inter font-medium px-6 py-3 rounded-lg transition-all',
              showUpload
                ? 'bg-secondary text-primary'
                : 'bg-primary text-white hover:bg-primary/90'
            )}
          >
            <Images className="w-5 h-5" />
            {showUpload ? 'Hide Upload' : 'Upload Your Photo'}
          </button>
        </div>

        <AnimatePresence>
          {showUpload && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <DropZone
                onFilesSelected={handleFilesSelected}
                maxFiles={5}
                maxSizeMB={5}
              />

              {uploadingFiles.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                  {uploadingFiles.map((f) => (
                    <ImagePreview
                      key={f.id}
                      file={f.file}
                      url={f.url}
                      status={f.status as 'uploading' | 'success' | 'error'}
                      progress={f.progress}
                      onRemove={() => handleRemoveUpload(f.id)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setLightboxImage(image)}
            >
              <Image
                src={image.url}
                alt={image.title || 'Gallery image'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-4">
                  {image.title && <p className="font-inter font-medium">{image.title}</p>}
                  {image.tags && (
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {image.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-white/20 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                <Heart className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-[16/9]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.title || 'Gallery image'}
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>
            {lightboxImage.title && (
              <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-inter text-xl">
                {lightboxImage.title}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}