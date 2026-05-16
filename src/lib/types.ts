export interface UploadedImage {
  id: string
  url: string
  thumbnailUrl: string
  publicId: string
  createdAt: string
  uploadedBy: 'admin' | 'visitor'
  projectId?: string // if linked to a project
}

export interface GalleryImage extends UploadedImage {
  title?: string
  description?: string
  tags?: string[]
}

export interface ProjectImage extends UploadedImage {
  projectId: string
}