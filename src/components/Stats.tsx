'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

const BG_CARD = '#1A4D2E'
const CREAM   = '#F8F3EA'
const COFFEE  = '#C4832A'
const FOREST  = '#1A4D2E'

const STATS = [
  { value: 2020, suffix: '',    label: 'Year Founded', desc: 'Born in Leppangeng with big dreams', noAnim: true },
  { value: 8,    suffix: '',    label: 'Branches',     desc: 'Spread across South Sulawesi' },
  { value: 99,   suffix: '.8%', label: 'Satisfaction', desc: 'Customer reviewed excellence' },
]

function CountUp({ target, suffix, trigger, noAnim }: {
  target: number; suffix: string; trigger: boolean; noAnim?: boolean
}) {
  const [count, setCount] = useState(noAnim ? target : 0)

  useEffect(() => {
    if (!trigger || noAnim) return
    const dur = 1800
    const t0 = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const t = Math.min((now - t0) / dur, 1)
      setCount(Math.round(ease(t) * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [trigger, target, noAnim])

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{count.toLocaleString()}{suffix}</span>
}

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    <div ref={ref} style={{ borderRadius: '1rem', overflow: 'hidden', backgroundColor: BG_CARD }}>
      <motion.div
        style={{ position: 'relative', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: index * 0.12 }}
      >
        {/* Coffee top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          backgroundColor: COFFEE,
          transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform 0.7s cubic-bezier(0.76,0,0.24,1) ${index * 0.12 + 0.2}s`,
        }} />

        {/* Number */}
        <div style={{
          fontFamily: 'Georgia, serif', fontWeight: 700,
          letterSpacing: '-0.03em', lineHeight: 1,
          fontSize: 'clamp(3.5rem, 7vw, 6rem)',
          color: CREAM,
        }}>
          <CountUp target={stat.value} suffix={stat.suffix} trigger={isInView} noAnim={stat.noAnim} />
        </div>

        <div>
          <p style={{ color: COFFEE, fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'system-ui, sans-serif' }}>
            {stat.label}
          </p>
          <p style={{ color: 'rgba(248,243,234,0.75)', fontSize: '0.875rem', fontFamily: 'system-ui, sans-serif', fontWeight: 300, lineHeight: 1.5 }}>
            {stat.desc}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 80%', 'start 20%'] })
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const titleY       = useTransform(scrollYProgress, [0, 0.5], [30, 0])

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{ position: 'relative', backgroundColor: '#EDE4D4', padding: '6rem 5vw', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '9999px', backgroundColor: 'rgba(196,131,42,0.05)', filter: 'blur(80px)' }} />
      </div>

      <motion.div style={{ marginBottom: '5rem', opacity: titleOpacity, y: titleY }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '24px', height: '1px', backgroundColor: COFFEE }} />
          <span style={{ color: COFFEE, fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>By the Numbers</span>
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: FOREST }}>
          Small beginnings,<br />big love.
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
      </div>
    </section>
  )
}
