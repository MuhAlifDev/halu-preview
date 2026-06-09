'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const BG = '#1A4D2E'
const CREAM = '#F8F3EA'
const COFFEE = '#C4832A'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Halo. changed the way I start every morning. It's not just coffee — it's a ceremony I'd never skip.",
    author: 'Sarah Kessler',
    role: 'Architect, Riverside',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 2,
    quote: "The complexity in every sip is unlike anything I've tasted. The signature blend is pure poetry.",
    author: 'James Morioka',
    role: 'Chef, Riverside',
    avatar: 'https://i.pravatar.cc/80?img=11',
  },
  {
    id: 3,
    quote: "From bean to cup, the craftsmanship is undeniable. You can taste the dedication in every ounce.",
    author: 'Aiko Tanaka',
    role: 'Designer, Lakeview',
    avatar: 'https://i.pravatar.cc/80?img=25',
  },
  {
    id: 4,
    quote: "My mornings don't start without Halo. It's become the non-negotiable anchor of my day.",
    author: 'Marcus Levin',
    role: 'Writer, Westbrook',
    avatar: 'https://i.pravatar.cc/80?img=33',
  },
]

function StarRating() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '24px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="20" height="20" viewBox="0 0 18 18" fill={COFFEE}>
          <path d="M9 1.5l2.06 4.18 4.61.67-3.34 3.25.79 4.6L9 11.77l-4.12 2.43.79-4.6L2.33 6.35l4.61-.67z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)

  const next = useCallback(() => setCurrent((v) => (v + 1) % TESTIMONIALS.length), [])
  const prev = useCallback(() => setCurrent((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5500)
    return () => clearInterval(id)
  }, [paused, next])

  const t = TESTIMONIALS[current]

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: BG,   // inline — bypasses any Tailwind bg-forest issue
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '8rem 2rem',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Giant bg number */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden
        >
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, lineHeight: 1, fontSize: 'clamp(18rem, 50vw, 46rem)', color: 'rgba(248,243,234,0.04)' }}>
            {String(current + 1).padStart(2, '0')}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Foreground */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

        {/* Tag */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ width: '24px', height: '1px', backgroundColor: COFFEE }} />
          <span style={{ color: COFFEE, fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>Voices</span>
          <div style={{ width: '24px', height: '1px', backgroundColor: COFFEE }} />
        </motion.div>

        {/* Quote area */}
        <div style={{ maxWidth: '48rem', width: '100%', textAlign: 'center' }}>
          <StarRating />

          {/* Quote mark */}
          <div style={{ fontFamily: 'Georgia, serif', lineHeight: 1, userSelect: 'none', marginBottom: '16px', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'rgba(196,131,42,0.4)' }} aria-hidden>
            "
          </div>

          {/* Quote text */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              style={{ fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.25, fontSize: 'clamp(1.3rem, 3vw, 2.4rem)', color: CREAM }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              {t.quote}
            </motion.blockquote>
          </AnimatePresence>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${current}`}
              style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <img
                src={t.avatar}
                alt={t.author}
                style={{ width: '44px', height: '44px', borderRadius: '9999px', objectFit: 'cover', border: `1px solid ${COFFEE}80`, filter: 'grayscale(1)' }}
              />
              <div>
                <p style={{ color: CREAM, fontFamily: 'system-ui, sans-serif', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.03em', margin: 0 }}>
                  {t.author}
                </p>
                <p style={{ color: 'rgba(248,243,234,0.65)', fontFamily: 'system-ui, sans-serif', fontSize: '0.75rem', letterSpacing: '0.05em', marginTop: '3px' }}>
                  {t.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '56px' }}>
          <button onClick={prev} style={{ color: 'rgba(248,243,234,0.45)', cursor: 'pointer', padding: '8px', background: 'none', border: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,243,234,0.45)')}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                <motion.div
                  style={{ borderRadius: '9999px' }}
                  animate={{ width: i === current ? 24 : 6, height: 6, backgroundColor: i === current ? COFFEE : 'rgba(248,243,234,0.22)' }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                />
              </button>
            ))}
          </div>

          <button onClick={next} style={{ color: 'rgba(248,243,234,0.45)', cursor: 'pointer', padding: '8px', background: 'none', border: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,243,234,0.45)')}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        key={`p-${current}`}
        style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', backgroundColor: COFFEE, originX: 0, zIndex: 10 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: paused ? undefined : 1 }}
        transition={{ duration: 5.5, ease: 'linear' }}
      />
    </section>
  )
}
