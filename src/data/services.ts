export interface Service {
  id: string
  icon: 'Palette' | 'Hammer' | 'MessageCircle'
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: '1',
    icon: 'Palette',
    title: 'New Design',
    description: 'Full-service interior design from concept development to final installation. We bring your vision to life with meticulous attention to detail.',
  },
  {
    id: '2',
    icon: 'Hammer',
    title: 'Renovation',
    description: 'Transform your existing space with fresh perspective and innovative design solutions. We revitalize tired interiors into stunning environments.',
  },
  {
    id: '3',
    icon: 'MessageCircle',
    title: 'Consultation',
    description: 'Expert guidance for your design vision and budget. Get professional advice on materials, layouts, and aesthetic choices tailored to your needs.',
  },
]