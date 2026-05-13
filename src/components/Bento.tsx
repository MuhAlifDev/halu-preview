'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const CARDS = [
  {
    id: 1,
    title: 'Fresh Every Morning',
    sub: 'Our Signature Drinks',
    img: '/halu-drinks.jpg',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    title: 'Cozy Atmosphere',
    sub: 'Stay & Sip',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    title: 'Handcrafted Daily',
    sub: 'With Love',
    img: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 4,
    title: 'Good Vibes Only',
    sub: 'Halu. Space',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 5,
    title: 'Local Roots',
    sub: 'Since 2020',
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80',
    span: 'md:col-span-2 md:row-span-1',
  },
]

function BentoCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start 90%', 'start 30%'] })
  const y       = useTransform(scrollYProgress, [0, 1], [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl bg-forest group cursor-pointer ${card.span}`}
      style={{ y, opacity }}
      whileHover={{ scale: 1.015, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
    >
      <motion.img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />

      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-coffee origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 + index * 0.05 }}
        >
          <p className="text-coffee text-[0.58rem] tracking-[0.35em] uppercase mb-1 font-sans">{card.sub}</p>
          <h3 className="text-cream font-serif font-bold text-xl md:text-2xl tracking-tight leading-tight">
            {card.title}
          </h3>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Bento() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 90%', 'start 30%'] })
  const tagOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const tagY       = useTransform(scrollYProgress, [0, 0.4], [20, 0])

  return (
    <section id="bento" ref={sectionRef} className="relative bg-cream py-28 px-8 md:px-12 lg:px-20">
      <motion.div
        className="flex items-end justify-between mb-12 md:mb-16"
        style={{ opacity: tagOpacity, y: tagY }}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-coffee" />
            <span className="text-coffee text-[0.6rem] tracking-[0.45em] uppercase font-sans">Our Gallery</span>
          </div>
          <h2 className="text-forest font-serif font-bold tracking-tighter leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            A space you'll love<br />coming back to.
          </h2>
        </div>
        <p className="hidden md:block text-forest/50 text-sm font-sans font-light max-w-xs text-right leading-relaxed">
          Every corner tells our story — from the cup in your hand to the seat you choose.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] md:grid-rows-[280px_280px] gap-4">
        {CARDS.map((card, i) => <BentoCard key={card.id} card={card} index={i} />)}
      </div>
    </section>
  )
}
