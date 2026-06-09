'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const BG     = '#1A4D2E'
const CREAM  = '#F8F3EA'
const COFFEE = '#C4832A'

const LINKS = {
  'Explore': ['Story', 'Menu', 'Gallery', 'Branches'],
  'Support': ['FAQ', 'Delivery', 'Returns', 'Contact'],
  'Company': ['About', 'Careers', 'Press', 'Franchising'],
}

const SOCIALS = [
  { label: 'IG', full: 'Instagram', href: '#' },
  { label: 'TK', full: 'TikTok',    href: '#' },
  { label: 'TW', full: 'Twitter',   href: '#' },
]

function BrandMark() {
  return (
    <span
      style={{
        fontFamily: 'Georgia, serif',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        fontSize: '38px',
        color: CREAM,
        display: 'inline-block',
      }}
      aria-label="Halo. Coffee"
    >
      Halo.
    </span>
  )
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ['start 90%', 'start 40%'] })
  const logoY       = useTransform(scrollYProgress, [0, 1], [60, 0])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        backgroundColor: BG,   // inline — guaranteed dark green
        paddingTop: '6rem',
        paddingBottom: '2.5rem',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(to right, transparent, ${COFFEE}80, transparent)` }} />

      {/* HALO watermark */}
      <motion.div
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden', y: logoY, opacity: logoOpacity }}
        aria-hidden
      >
        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, fontSize: 'clamp(8rem, 28vw, 22rem)', color: 'rgba(248,243,234,0.07)' }}>
          HALO
        </span>
      </motion.div>

      {/* Main grid */}
      <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
        {/* Brand col */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ marginBottom: '20px' }}>
            <BrandMark />
          </div>
          <p style={{ color: 'rgba(248,243,234,0.80)', fontFamily: 'system-ui, sans-serif', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7, maxWidth: '18rem', marginBottom: '2rem' }}>
            Your everyday cafe, brewed with care. Est. 2020, Riverside.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.full}
                style={{
                  width: '32px', height: '32px',
                  border: '1px solid rgba(248,243,234,0.30)',
                  borderRadius: '9999px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(248,243,234,0.70)',
                  fontSize: '0.55rem', letterSpacing: '0.1em',
                  textDecoration: 'none',
                  fontFamily: 'system-ui, sans-serif',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = COFFEE; e.currentTarget.style.borderColor = COFFEE }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,243,234,0.70)'; e.currentTarget.style.borderColor = 'rgba(248,243,234,0.30)' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(LINKS).map(([category, items]) => (
          <div key={category}>
            <p style={{ color: COFFEE, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'system-ui, sans-serif' }}>
              {category}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      color: 'rgba(248,243,234,0.75)',
                      fontSize: '0.875rem',
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: 300,
                      textDecoration: 'none',
                      display: 'inline-block',
                      transition: 'color 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = CREAM; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,243,234,0.75)'; e.currentTarget.style.transform = 'translateX(0)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        paddingTop: '32px',
        borderTop: '1px solid rgba(248,243,234,0.15)',
      }}>
        <span style={{ color: 'rgba(248,243,234,0.60)', fontSize: '0.7rem', letterSpacing: '0.12em', fontFamily: 'system-ui, sans-serif' }}>
          © {new Date().getFullYear()} Halo. Coffee. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: 'rgba(248,243,234,0.60)', fontSize: '0.7rem', letterSpacing: '0.05em', fontFamily: 'system-ui, sans-serif', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(248,243,234,0.90)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,243,234,0.60)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
