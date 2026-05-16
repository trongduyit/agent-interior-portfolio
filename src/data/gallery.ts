// src/data/gallery.ts
import { GalleryImage } from '@/lib/types'

const STORAGE_KEY = 'visitor_gallery'

export const getGalleryImages = (): GalleryImage[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const addGalleryImage = (image: GalleryImage): void => {
  if (typeof window === 'undefined') return
  const images = getGalleryImages()
  images.unshift(image) // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images.slice(0, 50))) // Keep max 50
}

export const removeGalleryImage = (id: string): void => {
  if (typeof window === 'undefined') return
  const images = getGalleryImages()
  const filtered = images.filter((img) => img.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

// Sample images for demo
export const sampleGalleryImages: GalleryImage[] = [
  {
    id: 'sample-1',
    url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200&h=150&fit=crop',
    publicId: 'sample-1',
    createdAt: new Date().toISOString(),
    uploadedBy: 'visitor',
    title: 'Living Room Inspiration',
    tags: ['living-room', 'modern'],
  },
  {
    id: 'sample-2',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=150&fit=crop',
    publicId: 'sample-2',
    createdAt: new Date().toISOString(),
    uploadedBy: 'visitor',
    title: 'Kitchen Design',
    tags: ['kitchen', 'minimal'],
  },
  {
    id: 'sample-3',
    url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=150&fit=crop',
    publicId: 'sample-3',
    createdAt: new Date().toISOString(),
    uploadedBy: 'visitor',
    title: 'Bathroom Spa',
    tags: ['bathroom', 'spa'],
  },
]