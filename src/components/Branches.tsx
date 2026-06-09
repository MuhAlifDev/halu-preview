'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'

const BRANCHES = [
  { id: 1, name: 'Halo. Riverside Central',  address: 'Jl. Melati No. 12',     city: 'Riverside',  hours: '07.00 – 22.00' },
  { id: 2, name: 'Halo. Riverside South',    address: 'Jl. Cemara No. 45',     city: 'Riverside',  hours: '08.00 – 22.00' },
  { id: 3, name: 'Halo. Riverside North',    address: 'Jl. Anggrek No. 67',    city: 'Riverside',  hours: '07.00 – 21.00' },
  { id: 4, name: 'Halo. Westbrook',          address: 'Jl. Mawar No. 78',      city: 'Westbrook',  hours: '07.00 – 23.00' },
  { id: 5, name: 'Halo. Westbrook Plaza',    address: 'Jl. Kenanga No. 34',    city: 'Westbrook',  hours: '09.00 – 23.00' },
  { id: 6, name: 'Halo. Westbrook Park',     address: 'Jl. Boulevard No. 90',  city: 'Westbrook',  hours: '08.00 – 22.00' },
  { id: 7, name: 'Halo. Lakeview',           address: 'Jl. Dahlia No. 56',     city: 'Lakeview',   hours: '07.00 – 21.00' },
  { id: 8, name: 'Halo. Lakeview Bay',       address: 'Jl. Teratai No. 23',    city: 'Lakeview',   hours: '08.00 – 22.00' },
]

function BranchCard({ branch, index }: { branch: typeof BRANCHES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    // Outer div: no opacity animation — always visible
    <div ref={ref} className="group cursor-pointer">
      <motion.div
        className="relative border border-forest/15 rounded-xl p-6 md:p-7 bg-cream hover:border-coffee/50 transition-colors duration-300 overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: (index % 4) * 0.07 }}
        whileHover={{ scale: 1.012 }}
      >
        {/* On hover: content dims to ~70% — no text color change, no fill */}
        <div className="group-hover:opacity-[0.68] transition-opacity duration-300">
          <span className="block text-coffee text-[0.55rem] tracking-[0.4em] uppercase mb-3 font-sans">
            Branch {String(branch.id).padStart(2, '0')}
          </span>

          <h3 className="text-forest font-serif font-bold text-lg md:text-xl leading-tight mb-3">
            {branch.name}
          </h3>

          <p className="text-forest/75 text-sm font-sans mb-0.5">{branch.address}</p>
          <p className="text-forest/55 text-sm font-sans mb-4">{branch.city}</p>

          <div className="flex items-center gap-2">
            <div className="w-3 h-px bg-coffee" />
            <span className="text-coffee text-xs font-sans tracking-wider">{branch.hours}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Branches() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 80%', 'start 20%'] })
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const titleY       = useTransform(scrollYProgress, [0, 0.5], [30, 0])

  return (
    <section id="branches" ref={sectionRef} className="relative bg-latte py-28 px-8 md:px-12 lg:px-20">
      <motion.div className="mb-16" style={{ opacity: titleOpacity, y: titleY }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-coffee" />
          <span className="text-coffee text-[0.6rem] tracking-[0.45em] uppercase font-sans">Find Us</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-forest font-serif font-bold tracking-tighter leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            8 places<br />to find us.
          </h2>
          <p className="text-forest/55 font-sans font-light text-sm max-w-xs leading-relaxed md:text-right">
            Riverside, Westbrook, and Lakeview — growing because you keep coming back.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BRANCHES.map((branch, i) => (
          <BranchCard key={branch.id} branch={branch} index={i} />
        ))}
      </div>
    </section>
  )
}
