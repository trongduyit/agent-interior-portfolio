export interface Testimonial {
  id: string
  quote: string
  clientName: string
  clientPhoto: string
  project: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Their attention to detail transformed our office into a space that inspires our team every single day. Exceptional craftsmanship and design vision.',
    clientName: 'Minh Anh',
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    project: 'The Heights Office',
  },
  {
    id: '2',
    quote: 'A perfect blend of luxury and functionality. They exceeded every expectation we had for our dream home. Truly remarkable work.',
    clientName: 'David Tran',
    clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    project: 'Villa Dorada',
  },
  {
    id: '3',
    quote: 'They understood our brand identity perfectly and translated it into stunning interior design. Our clients constantly compliment our space.',
    clientName: 'Jennifer Liu',
    clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    project: 'Steel & Glass Hub',
  },
]