'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'

const MENU = [
  {
    category: 'Coffee',
    items: [
      { name: 'Americano',          desc: 'Double shot espresso over water',   price: 12 },
      { name: 'Signature Milk',     desc: 'Our signature milk coffee',          price: 14 },
      { name: 'Latte',              desc: 'Espresso with steamed milk',          price: 15 },
      { name: 'Cappuccino',         desc: 'Espresso, milk, foam — balanced',     price: 15 },
      { name: 'Cold Brew',          desc: '18-hour slow steeped',                price: 18 },
      { name: 'Espresso',           desc: 'Pure, concentrated, bold',            price: 10 },
    ],
  },
  {
    category: 'Non-Coffee',
    items: [
      { name: 'Matcha Latte',       desc: 'Ceremonial grade, oat milk',          price: 16 },
      { name: 'Chocolate Milk',     desc: 'Dark cocoa, steamed milk',             price: 14 },
      { name: 'Taro Milk',          desc: 'Creamy purple yam blend',              price: 15 },
      { name: 'Malt Choco',         desc: 'Classic nostalgia in a cup',           price: 14 },
      { name: 'Strawberry Milk',    desc: 'Fresh, sweet, refreshing',             price: 15 },
      { name: 'Lemon Tea',          desc: 'Brewed black tea, fresh lemon',        price: 12 },
    ],
  },
  {
    category: 'Bites',
    items: [
      { name: 'Croissant',          desc: 'Butter, flaky, baked daily',          price: 14 },
      { name: 'Banana Bread',       desc: 'Soft, house-made loaf',                price: 12 },
      { name: 'Cream Puff',         desc: 'Choux pastry, vanilla cream',          price: 8  },
      { name: 'Avocado Toast',      desc: 'Sourdough, smashed avo',               price: 18 },
    ],
  },
]

function MenuItem({ name, desc, price, index }: {
  name: string; desc: string; price: number; index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    <motion.div
      ref={ref}
      className="flex items-start justify-between gap-4 py-4 border-b border-forest/10 last:border-b-0 group"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: (index % 6) * 0.05 }}
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-forest font-serif font-bold text-base md:text-lg leading-tight group-hover:text-coffee transition-colors duration-200 mb-0.5">
          {name}
        </h4>
        <p className="text-forest/55 text-xs font-sans leading-relaxed">{desc}</p>
      </div>
      <span className="shrink-0 text-coffee font-serif font-bold text-base">{price}K</span>
    </motion.div>
  )
}

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 85%', 'start 25%'] })
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const titleY       = useTransform(scrollYProgress, [0, 0.5], [30, 0])

  return (
    <section id="menu" ref={sectionRef} className="relative bg-cream py-28 px-8 md:px-12 lg:px-20">

      {/* Decorative bg text — z-0 stays strictly behind content */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-serif font-bold leading-none select-none pointer-events-none overflow-hidden"
        style={{
          fontSize: 'clamp(8rem, 22vw, 18rem)',
          color: '#1A4D2E',
          opacity: 0.5,   // user requested ~50%
          zIndex: 0,
        }}
        aria-hidden
      >
        Menu
      </div>

      {/* All real content sits above the bg text */}
      <div className="relative" style={{ zIndex: 1 }}>
        <motion.div className="mb-16 md:mb-20" style={{ opacity: titleOpacity, y: titleY }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-coffee" />
            <span className="text-coffee text-[0.6rem] tracking-[0.45em] uppercase font-sans">What We Serve</span>
          </div>
          <h2 className="text-forest font-serif font-bold tracking-tighter leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Our menu.
          </h2>
          <p className="text-forest/55 font-sans font-light mt-4 max-w-md leading-relaxed">
            All drinks priced under 20K IDR. Simple, honest, made for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {MENU.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-forest font-serif font-bold text-xl">{cat.category}</span>
                <div className="flex-1 h-px bg-forest/10" />
              </div>
              {cat.items.map((item, i) => (
                <MenuItem key={item.name} {...item} index={i} />
              ))}
            </div>
          ))}
        </div>

        <motion.p
          className="mt-16 text-center text-forest/35 text-xs font-sans tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Prices in IDR · Menu may change seasonally · All made fresh to order
        </motion.p>
      </div>
    </section>
  )
}
