import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Agent for Interior Design | Premium Portfolio',
  description: 'Luxury interior design portfolio showcasing premium spaces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-inter antialiased bg-background text-text-primary">
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}