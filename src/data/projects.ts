export interface Project {
  id: string
  name: string
  style: 'modern-luxury' | 'japandi' | 'art-deco' | 'industrial' | 'scandinavian' | 'neo-classical' | 'biophilic' | 'mediterranean'
  type: 'office' | 'shophouse' | 'villa'
  area: number
  description: string
  image: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'The Heights Office',
    style: 'modern-luxury',
    type: 'office',
    area: 120,
    description: 'A sophisticated office space blending contemporary elegance with functional design. Features floor-to-ceiling glass walls, custom walnut paneling, and premium marble flooring.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1200&fit=crop',
    featured: true,
  },
  {
    id: '2',
    name: 'Sakura Shophouse',
    style: 'japandi',
    type: 'shophouse',
    area: 80,
    description: 'A harmonious Japandi-inspired retail space combining Japanese minimalism with Scandinavian functionality. Natural oak, shoji screens, and earth tone palette create a serene shopping experience.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=1200&fit=crop',
    featured: false,
  },
  {
    id: '3',
    name: 'Villa Dorada',
    style: 'art-deco',
    type: 'villa',
    area: 200,
    description: 'A stunning Art Deco villa featuring geometric wall paneling in black and gold, chevron marble floors, and 1920s Hollywood glamour aesthetic with emerald velvet and crystal chandeliers.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=1200&fit=crop',
    featured: true,
  },
  {
    id: '4',
    name: 'Steel & Glass Hub',
    style: 'industrial',
    type: 'office',
    area: 100,
    description: 'Industrial luxury office with exposed brick accent walls, polished concrete floors, black steel frame glass partitions, and Edison bulb pendant lights.',
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea2f7d1c8?w=1600&h=1200&fit=crop',
    featured: false,
  },
  {
    id: '5',
    name: 'Nordic Corner',
    style: 'scandinavian',
    type: 'shophouse',
    area: 65,
    description: 'A compact Scandinavian-style shophouse featuring white oak flooring, hygge concept furniture, and a light-filled atmosphere with pops of muted blue accents.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=1200&fit=crop',
    featured: false,
  },
  {
    id: '6',
    name: 'Palazzo Nuovo',
    style: 'neo-classical',
    type: 'villa',
    area: 180,
    description: 'A neo-classical villa with coffered ceilings, marble herringbone flooring, French provincial furniture, and an elegant champagne and ivory color palette.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1200&fit=crop',
    featured: true,
  },
  {
    id: '7',
    name: 'Green Oasis Studio',
    style: 'biophilic',
    type: 'office',
    area: 90,
    description: 'A biophilic design office featuring a living green wall, reclaimed teak flooring, and maximized natural daylight creating a wellness-focused workspace.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=1200&fit=crop',
    featured: false,
  },
  {
    id: '8',
    name: 'Casa Mediterranea',
    style: 'mediterranean',
    type: 'villa',
    area: 150,
    description: 'A Mediterranean-inspired villa with terra cotta tile flooring, arched openings, white lime-washed walls, and outdoor living room concept with lemon trees.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=1200&fit=crop',
    featured: false,
  },
]

export const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'office', label: 'Office' },
  { value: 'shophouse', label: 'Shophouse' },
  { value: 'villa', label: 'Villa' },
] as const

export type FilterType = typeof filterOptions[number]['value']