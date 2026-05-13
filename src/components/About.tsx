'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'

const HEADLINE = "We don't just make coffee."
const BODY =
  "We craft rituals. Each bean is selected by hand from high-altitude farms, " +
  "roasted to its precise peak, and delivered to your cup with the reverence " +
  "it deserves. This is not mass production. This is devotion."

function AnimChar({ char, progress, start, end }: {
  char: string; progress: MotionValue<number>; start: number; end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">{char}</motion.span>
  )
}

function RevealText({ text, progress, startAt, endAt, className = '' }: {
  text: string; progress: MotionValue<number>; startAt: number; endAt: number; className?: string
}) {
  const chars = text.split('')
  const n = chars.length
  return (
    <span className={`inline ${className}`}>
      {chars.map((char, i) => {
        const charStart = startAt + (i / n) * (endAt - startAt)
        // +10 overlap = more chars reveal simultaneously = faster feel
        const charEnd = startAt + ((i + 10) / n) * (endAt - startAt)
        return <AnimChar key={i} char={char} progress={progress} start={charStart} end={charEnd} />
      })}
    </span>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Tighter offset so animation completes earlier in scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 40%'],
  })

  const lineScale    = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const tagOpacity   = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const statsOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1])
  const statsY       = useTransform(scrollYProgress, [0.55, 0.8], [30, 0])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-cream flex items-center py-32 px-8 md:px-16 lg:px-28"
    >
      <motion.div
        className="absolute left-8 md:left-16 top-32 bottom-32 w-px bg-coffee/20 origin-top"
        style={{ scaleY: lineScale }}
      />

      <div className="max-w-5xl mx-auto w-full">
        <motion.div className="flex items-center gap-4 mb-16" style={{ opacity: tagOpacity }}>
          <div className="w-8 h-px bg-coffee" />
          <span className="text-coffee text-[0.6rem] tracking-[0.45em] uppercase font-sans">Our Philosophy</span>
        </motion.div>

        {/* Smaller clamp so "coffee." doesn't wrap */}
        <h2
          className="text-forest font-serif font-bold tracking-tighter leading-[0.92] mb-12"
          style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.8rem)' }}
        >
          <RevealText text={HEADLINE} progress={scrollYProgress} startAt={0.05} endAt={0.38} />
        </h2>

        <p
          className="text-forest/70 font-sans font-light leading-relaxed max-w-3xl"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}
        >
          <RevealText text={BODY} progress={scrollYProgress} startAt={0.3} endAt={0.72} />
        </p>

        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg"
          style={{ opacity: statsOpacity, y: statsY }}
        >
          {[
            { num: '6',    label: 'Years brewing' },
            { num: '1K+',  label: 'Happy customers' },
            { num: '99.8%', label: 'Satisfaction rate' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-coffee font-serif font-bold tracking-tighter leading-none mb-1"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                {num}
              </div>
              <div className="text-forest/50 text-xs tracking-wider uppercase font-sans">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee/20 to-transparent"
        style={{ scaleX: lineScale }}
      />
    </section>
  )
}
