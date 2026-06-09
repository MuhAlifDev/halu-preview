'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react'

const TOTAL_FRAMES = 240
const CANVAS_BG = '#0c0a07'
const getFramePath = (i: number) => `/sequence/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

// Dummy text wordmark — color switches via text color
function BrandMark({ color, height = '38px' }: {
  color: string; width?: string; height?: string
}) {
  return (
    <span
      style={{
        fontFamily: 'Georgia, serif',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color,
        fontSize: height,
        display: 'inline-block',
        transition: 'color 0.3s',
      }}
      aria-label="Halo. Coffee"
    >
      Halo.
    </span>
  )
}

function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={(e) => {
        const r = btnRef.current?.getBoundingClientRect()
        if (!r) return
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.38, y: (e.clientY - r.top - r.height / 2) * 0.38 })
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHovered(false) }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 160, damping: 16, mass: 0.1 }}
      className="relative group mt-8 px-12 py-5 border border-cream/40 text-cream text-xs tracking-[0.25em] uppercase overflow-hidden cursor-pointer font-sans"
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-forest">Order Now</span>
      <motion.span
        className="absolute inset-0 bg-cream"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      />
    </motion.button>
  )
}

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const imagesRef    = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
  const loadedCountRef   = useRef(0)
  const currentFrameRef  = useRef(0)
  const rafRef           = useRef<number>(0)
  const pendingFrameRef  = useRef<number | null>(null)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded]         = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imagesRef.current[idx]
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return
    const cw = canvas.width, ch = canvas.height
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - img.naturalWidth * scale) / 2, (ch - img.naturalHeight * scale) / 2, img.naturalWidth * scale, img.naturalHeight * scale)
    currentFrameRef.current = idx
  }, [])

  const getNearestLoaded = useCallback((t: number) => {
    if (imagesRef.current[t]) return t
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (t - i >= 0 && imagesRef.current[t - i]) return t - i
      if (t + i < TOTAL_FRAMES && imagesRef.current[t + i]) return t + i
    }
    return -1
  }, [])

  useEffect(() => {
    let mounted = true
    const loadOne = (idx: number): Promise<void> => new Promise((resolve) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = getFramePath(idx + 1)
      const done = () => {
        if (!mounted) return resolve()
        imagesRef.current[idx] = img
        loadedCountRef.current += 1
        setLoadProgress(Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100))
        if (loadedCountRef.current === TOTAL_FRAMES) setIsLoaded(true)
        resolve()
      }
      img.onload = done; img.onerror = done
    })
    loadOne(0).then(() => {
      drawFrame(0)
      let idx = 1
      const nextBatch = () => {
        if (!mounted || idx >= TOTAL_FRAMES) return
        const batch: Promise<void>[] = []
        for (let b = 0; b < 24 && idx < TOTAL_FRAMES; b++, idx++) batch.push(loadOne(idx))
        Promise.all(batch).then(() => requestAnimationFrame(nextBatch))
      }
      requestAnimationFrame(nextBatch)
    })
    return () => { mounted = false }
  }, [drawFrame])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(currentFrameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [drawFrame])

  useEffect(() => {
    if (!isLoaded) return
    drawFrame(0)
    const t = setTimeout(() => setShowPreloader(false), 800)
    return () => clearTimeout(t)
  }, [isLoaded, drawFrame])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const target = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(latest * (TOTAL_FRAMES - 1))))
    pendingFrameRef.current = target
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (pendingFrameRef.current === null) return
      const nearest = getNearestLoaded(pendingFrameRef.current)
      if (nearest !== -1) drawFrame(nearest)
      pendingFrameRef.current = null
    })
  })

  const titleOpacity   = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.27], [0, 1, 1, 0])
  const titleY         = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.27], [40, 0, 0, -40])
  const slogan1Opacity = useTransform(scrollYProgress, [0.26, 0.34, 0.47, 0.55], [0, 1, 1, 0])
  const slogan1X       = useTransform(scrollYProgress, [0.26, 0.34, 0.47, 0.55], [-50, 0, 0, -50])
  const slogan2Opacity = useTransform(scrollYProgress, [0.56, 0.64, 0.77, 0.85], [0, 1, 1, 0])
  const slogan2X       = useTransform(scrollYProgress, [0.56, 0.64, 0.77, 0.85], [50, 0, 0, 50])
  const ctaOpacity     = useTransform(scrollYProgress, [0.86, 0.94, 1], [0, 1, 1])
  const ctaY           = useTransform(scrollYProgress, [0.86, 0.94], [40, 0])
  const label1Opacity  = useTransform(scrollYProgress, [0.26, 0.34], [0, 1])
  const label2Opacity  = useTransform(scrollYProgress, [0.56, 0.64], [0, 1])

  return (
    <>
      {/* ── Preloader ── */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ backgroundColor: CANVAS_BG }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="overflow-hidden mb-10 flex items-center justify-center">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              >
                {/* Preloader logo — 3× size */}
                <BrandMark color="#F8F3EA" width="clamp(240px, 35vw, 360px)" height="clamp(80px, 12vw, 120px)" />
              </motion.div>
            </div>

            <div className="w-48 h-px relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 bg-coffee"
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </div>

            <motion.span
              className="mt-5 text-cream/40 text-xs font-sans tracking-[0.3em] tabular-nums"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
              {loadProgress < 100 ? `${String(loadProgress).padStart(3, '0')} %` : 'READY'}
            </motion.span>

            <motion.p
              className="absolute bottom-12 font-sans uppercase tracking-[0.18em]"
              style={{ color: '#c4832a', fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            >
              Since 2020 · Riverside
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sequence ── */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: CANVAS_BG }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(12,10,7,0.55) 100%)' }}
          />

          {/* 0% — Hero title */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            {/* "Since 2020 Riverside" — bigger, coffee color */}
            <p
              className="font-sans uppercase tracking-[0.2em] mb-8"
              style={{ color: '#c4832a', fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)' }}
            >
              Since 2020 · Riverside
            </p>

            {/* Logo — 3× size */}
            <div className="flex justify-center mb-6">
              <BrandMark color="#F8F3EA" width="clamp(260px, 38vw, 440px)" height="clamp(86px, 13vw, 148px)" />
            </div>

            <p className="text-cream/60 text-base md:text-xl font-sans font-light tracking-wide mt-2 max-w-md">
              Crafted with love, served with warmth.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <div className="w-12 h-px bg-coffee/50" />
              <span className="text-coffee/70 text-[0.6rem] tracking-[0.4em] uppercase font-sans">Scroll to discover</span>
              <div className="w-12 h-px bg-coffee/50" />
            </div>
          </motion.div>

          {/* 30% — Slogan 1 (left) */}
          <motion.div
            className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xs pointer-events-none"
            style={{ opacity: slogan1Opacity, x: slogan1X }}
          >
            <motion.span
              className="block font-sans text-[0.6rem] tracking-[0.4em] uppercase mb-4"
              style={{ opacity: label1Opacity, color: '#c4832a' }}
            >
              The Process
            </motion.span>
            <p className="text-cream font-serif font-bold tracking-tighter leading-[0.92]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Every grain<br />a deliberate<br />choice.
            </p>
            <div className="mt-6 w-12 h-px" style={{ backgroundColor: '#c4832a', opacity: 0.5 }} />
          </motion.div>

          {/* 60% — Slogan 2 (right) */}
          <motion.div
            className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 max-w-xs text-right pointer-events-none"
            style={{ opacity: slogan2Opacity, x: slogan2X }}
          >
            <motion.span
              className="block font-sans text-[0.6rem] tracking-[0.4em] uppercase mb-4"
              style={{ opacity: label2Opacity, color: '#c4832a' }}
            >
              The Result
            </motion.span>
            <p className="text-cream font-serif font-bold tracking-tighter leading-[0.92]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Precision<br />roasted.<br />Perfectly<br />extracted.
            </p>
            <div className="mt-6 ml-auto w-12 h-px" style={{ backgroundColor: '#c4832a', opacity: 0.5 }} />
          </motion.div>

          {/* 90% — CTA */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <span className="block text-coffee text-[0.6rem] tracking-[0.45em] uppercase mb-5 font-sans">
              Begin Your Ritual
            </span>
            <p className="text-cream font-serif font-bold tracking-tighter leading-[0.9] max-w-2xl"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
              Your perfect cup<br />awaits.
            </p>
            <MagneticButton />
          </motion.div>
        </div>
      </div>
    </>
  )
}
