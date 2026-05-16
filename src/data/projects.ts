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
    image: '/images/projects/modern-luxury-office.jpg',
    featured: true,
  },
  {
    id: '2',
    name: 'Sakura Shophouse',
    style: 'japandi',
    type: 'shophouse',
    area: 80,
    description: 'A harmonious Japandi-inspired retail space combining Japanese minimalism with Scandinavian functionality. Natural oak, shoji screens, and earth tone palette create a serene shopping experience.',
    image: '/images/projects/japandi-shophouse.jpg',
    featured: false,
  },
  {
    id: '3',
    name: 'Villa Dorada',
    style: 'art-deco',
    type: 'villa',
    area: 200,
    description: 'A stunning Art Deco villa featuring geometric wall paneling in black and gold, chevron marble floors, and 1920s Hollywood glamour aesthetic with emerald velvet and crystal chandeliers.',
    image: '/images/projects/art-deco-villa.jpg',
    featured: true,
  },
  {
    id: '4',
    name: 'Steel & Glass Hub',
    style: 'industrial',
    type: 'office',
    area: 100,
    description: 'Industrial luxury office with exposed brick accent walls, polished concrete floors, black steel frame glass partitions, and Edison bulb pendant lights.',
    image: '/images/projects/industrial-office.jpg',
    featured: false,
  },
  {
    id: '5',
    name: 'Nordic Corner',
    style: 'scandinavian',
    type: 'shophouse',
    area: 65,
    description: 'A compact Scandinavian-style shophouse featuring white oak flooring, hygge concept furniture, and a light-filled atmosphere with pops of muted blue accents.',
    image: '/images/projects/scandinavian-shophouse.jpg',
    featured: false,
  },
  {
    id: '6',
    name: 'Palazzo Nuovo',
    style: 'neo-classical',
    type: 'villa',
    area: 180,
    description: 'A neo-classical villa with coffered ceilings, marble herringbone flooring, French provincial furniture, and an elegant champagne and ivory color palette.',
    image: '/images/projects/neo-classical-villa.jpg',
    featured: true,
  },
  {
    id: '7',
    name: 'Green Oasis Studio',
    style: 'biophilic',
    type: 'office',
    area: 90,
    description: 'A biophilic design office featuring a living green wall, reclaimed teak flooring, and maximized natural daylight creating a wellness-focused workspace.',
    image: '/images/projects/biophilic-office.jpg',
    featured: false,
  },
  {
    id: '8',
    name: 'Casa Mediterranea',
    style: 'mediterranean',
    type: 'villa',
    area: 150,
    description: 'A Mediterranean-inspired villa with terra cotta tile flooring, arched openings, white lime-washed walls, and outdoor living room concept with lemon trees.',
    image: '/images/projects/mediterranean-villa.jpg',
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