'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'

const BG = '#1A4D2E'
const CREAM = '#F8F3EA'
const COFFEE = '#C4832A'

const PLATFORMS = [
  {
    name: 'Instagram',
    handle: '@halu.coffee',
    desc: 'Daily shots, behind the scenes, and community moments.',
    url: 'https://instagram.com',
    stat: '12K',
    statLabel: 'Followers',
  },
  {
    name: 'TikTok',
    handle: '@halu.coffee',
    desc: 'Watch us brew, pour, and spill the beans on everything.',
    url: 'https://tiktok.com',
    stat: '28K',
    statLabel: 'Followers',
  },
  {
    name: 'Twitter / X',
    handle: '@halucoffee',
    desc: 'Hot takes, chill vibes, and updates from our team.',
    url: 'https://twitter.com',
    stat: '4.2K',
    statLabel: 'Followers',
  },
]

function PlatformCard({ platform, index }: { platform: typeof PLATFORMS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0 })
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref}>
      <motion.div
        style={{
          position: 'relative',
          border: `1px solid rgba(248,243,234,${hovered ? '0.35' : '0.12'})`,
          borderRadius: '1rem',
          padding: '2.5rem',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'border-color 0.3s',
          backgroundColor: hovered ? 'rgba(196,131,42,0.08)' : 'transparent',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.12 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Index */}
        <p style={{ color: 'rgba(248,243,234,0.40)', fontSize: '0.55rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '24px', fontFamily: 'system-ui, sans-serif' }}>
          {String(index + 1).padStart(2, '0')}
        </p>

        {/* Platform name */}
        <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 700, lineHeight: 1, marginBottom: '8px', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: CREAM }}>
          {platform.name}
        </h3>

        {/* Handle */}
        <p style={{ color: COFFEE, fontSize: '0.875rem', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.05em', marginBottom: '24px' }}>
          {platform.handle}
        </p>

        {/* Description */}
        <p style={{ color: 'rgba(248,243,234,0.72)', fontSize: '0.875rem', fontFamily: 'system-ui, sans-serif', fontWeight: 300, lineHeight: 1.65, marginBottom: '2rem', maxWidth: '20rem' }}>
          {platform.desc}
        </p>

        {/* Stat + Follow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.5rem', margin: 0 }}>
              {platform.stat}
            </p>
            <p style={{ color: 'rgba(248,243,234,0.55)', fontSize: '0.7rem', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
              {platform.statLabel}
            </p>
          </div>

          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: '1px solid rgba(248,243,234,0.30)',
              padding: '0.6rem 1.5rem',
              color: CREAM,
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'system-ui, sans-serif',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = COFFEE)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(248,243,234,0.30)')}
          >
            Follow
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default function SocialMedia() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 80%', 'start 20%'] })
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const titleY       = useTransform(scrollYProgress, [0, 0.5], [30, 0])

  return (
    <section
      id="social"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: BG,   // inline — guaranteed dark green
        padding: '7rem 5vw',
        overflow: 'hidden',
      }}
    >
      {/* Noise */}
      <div
        style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '200px',
        }}
      />

      <motion.div style={{ marginBottom: '4rem', position: 'relative', zIndex: 10, opacity: titleOpacity, y: titleY }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '24px', height: '1px', backgroundColor: COFFEE }} />
          <span style={{ color: COFFEE, fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
            Follow Along
          </span>
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: CREAM }}>
          Stay connected<br />with Halu.
        </h2>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {PLATFORMS.map((p, i) => <PlatformCard key={p.name} platform={p} index={i} />)}
      </div>
    </section>
  )
}
