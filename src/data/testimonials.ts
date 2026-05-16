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
    clientPhoto: '/images/testimonials/client-1.jpg',
    project: 'The Heights Office',
  },
  {
    id: '2',
    quote: 'A perfect blend of luxury and functionality. They exceeded every expectation we had for our dream home. Truly remarkable work.',
    clientName: 'David Tran',
    clientPhoto: '/images/testimonials/client-2.jpg',
    project: 'Villa Dorada',
  },
  {
    id: '3',
    quote: 'They understood our brand identity perfectly and translated it into stunning interior design. Our clients constantly compliment our space.',
    clientName: 'Jennifer Liu',
    clientPhoto: '/images/testimonials/client-3.jpg',
    project: 'Steel & Glass Hub',
  },
]