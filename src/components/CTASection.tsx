'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

function FloatingOrb({ delay, size, x, y, duration }: {
  delay: number; size: number; x: string; y: string; duration: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size, left: x, top: y,
        backgroundColor: '#C4832A', filter: 'blur(80px)', opacity: 0.14,
      }}
      animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 0.9, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function MagneticCTA() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={(e) => {
        const r = btnRef.current?.getBoundingClientRect()
        if (!r) return
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4 })
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false) }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative overflow-hidden group px-14 py-6 cursor-pointer"
    >
      <motion.span
        className="absolute inset-0 border border-cream/40"
        animate={{ borderColor: hovered ? 'rgba(248,243,234,0.9)' : 'rgba(248,243,234,0.4)' }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute inset-0 bg-cream origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
      <span className="relative z-10 text-cream text-xs tracking-[0.3em] uppercase font-sans font-medium transition-colors duration-300 group-hover:text-forest">
        Order Now
      </span>
    </motion.button>
  )
}

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 90%', 'center center'] })
  const headlineY       = useTransform(scrollYProgress, [0, 1], [80, 0])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const subOpacity      = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])

  return (
    <section id="cta" ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1A4D2E' }}>
      <div
        className="absolute inset-0 animate-gradient"
        style={{ background: 'linear-gradient(135deg, #1A4D2E 0%, #1e5c35 30%, #163d25 60%, #224f30 100%)' }}
      />
      <FloatingOrb delay={0} size={400} x="10%" y="20%" duration={12} />
      <FloatingOrb delay={3} size={300} x="70%" y="60%" duration={15} />
      <FloatingOrb delay={6} size={250} x="40%" y="70%" duration={10} />
      <FloatingOrb delay={2} size={200} x="80%" y="10%" duration={14} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(248,243,234,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(248,243,234,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <motion.div className="mb-3" style={{ opacity: subOpacity }}>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-coffee/60" />
            <span className="text-coffee text-[0.6rem] tracking-[0.5em] uppercase font-sans">Halu. Coffee</span>
            <div className="w-8 h-px bg-coffee/60" />
          </div>
        </motion.div>

        <motion.h2
          className="text-cream font-serif font-bold tracking-tighter leading-[0.88] mb-6"
          style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', y: headlineY, opacity: headlineOpacity }}
        >
          Your morning<br /><span className="text-coffee">ritual</span> awaits.
        </motion.h2>

        <motion.p
          className="text-cream/60 text-sm md:text-base font-sans font-light tracking-wide mb-12 max-w-md mx-auto"
          style={{ opacity: subOpacity }}
        >
          Find your nearest Halu. branch or order online. Fresh every day, for everyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticCTA />
          <a href="#branches" className="text-cream/40 text-xs tracking-[0.25em] uppercase hover:text-cream transition-colors duration-200 font-sans">
            Find a branch →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
