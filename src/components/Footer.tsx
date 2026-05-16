'use client'

import { motion } from 'framer-motion'
import SocialIcon from './ui/SocialIcon'

export default function Footer() {
  return (
    <footer className="w-full bg-primary py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-playfair text-xl font-semibold text-white"
        >
          Agent for Interior Design
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <SocialIcon platform="instagram" className="text-white/60 hover:text-secondary" />
          <SocialIcon platform="facebook" className="text-white/60 hover:text-secondary" />
          <SocialIcon platform="linkedin" className="text-white/60 hover:text-secondary" />
          <SocialIcon platform="pinterest" className="text-white/60 hover:text-secondary" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-sm text-white/60"
        >
          © 2026 Agent for Interior Design. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}