export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
}

// For demo purposes, use Cloudinary's demo cloud
// In production, replace with your own cloud name
export const isProduction = process.env.NODE_ENV === 'production'