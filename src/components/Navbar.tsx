'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const NAV_LINKS = [
  { label: 'Story',    href: '#about' },
  { label: 'Gallery',  href: '#bento' },
  { label: 'Numbers',  href: '#stats' },
  { label: 'Menu',     href: '#menu' },
  { label: 'Branches', href: '#branches' },
]

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok',    href: '#' },
  { label: 'Twitter',   href: '#' },
]

// Logo uses mask-image to allow color switching via backgroundColor
function HaluLogo({ color, className = '' }: { color: string; className?: string }) {
  return (
    <div
      className={className}
      style={{
        maskImage: 'url(/halu_logo.png)',
        WebkitMaskImage: 'url(/halu_logo.png)',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center left',
        WebkitMaskPosition: 'center left',
        backgroundColor: color,
        width: '90px',
        height: '30px',
        transition: 'background-color 0.3s ease',
      }}
      aria-label="Halu."
    />
  )
}

function NavLink({ label, href, index, onClose }: {
  label: string; href: string; index: number; onClose: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 + index * 0.08 }}
    >
      <a
        href={href}
        onClick={onClose}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex items-baseline gap-4 py-1 cursor-pointer"
      >
        <motion.span
          className="text-cream/30 text-xs font-sans tracking-widest tabular-nums"
          animate={{ opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.2 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <div className="overflow-hidden relative">
          <motion.span
            className="block font-serif font-bold tracking-tighter leading-none text-cream"
            style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
            animate={{ y: hovered ? '-105%' : '0%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {label}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 block font-serif font-bold tracking-tighter leading-none text-coffee"
            style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
            animate={{ y: hovered ? '0%' : '100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {label}
          </motion.span>
        </div>
      </a>
    </motion.div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      setPastHero(window.scrollY > window.innerHeight * 3.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Logo: forest on light bg, cream on dark bg
  const logoColor = menuOpen ? '#F8F3EA' : pastHero ? '#1A4D2E' : '#F8F3EA'
  // Hamburger lines color
  const lineColor = menuOpen ? '#F8F3EA' : pastHero ? '#1A4D2E' : '#F8F3EA'
  const navBg = scrolled && !menuOpen
    ? pastHero ? 'rgba(248,243,234,0.93)' : 'rgba(12,10,7,0.80)'
    : 'transparent'

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6"
        animate={{ backgroundColor: navBg, backdropFilter: scrolled && !menuOpen ? 'blur(12px)' : 'blur(0px)' }}
        transition={{ duration: 0.4 }}
      >
        <a href="#" className="relative z-50">
          <HaluLogo color={logoColor} />
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-50 flex flex-col gap-[5px] items-end cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px origin-right"
            animate={{ width: '28px', rotate: menuOpen ? -45 : 0, y: menuOpen ? 3 : 0, backgroundColor: lineColor }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="block h-px origin-right"
            animate={{ width: menuOpen ? '28px' : '18px', rotate: menuOpen ? 45 : 0, y: menuOpen ? -3 : 0, backgroundColor: lineColor }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-forest flex flex-col"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat', backgroundSize: '200px',
              }}
            />
            <motion.div
              className="absolute left-12 right-12 top-0 h-px bg-coffee/25"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <div className="flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-12">
              <nav className="mb-auto">
                {NAV_LINKS.map((link, i) => (
                  <NavLink key={link.label} {...link} index={i} onClose={() => setMenuOpen(false)} />
                ))}
              </nav>

              <motion.div
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-12 border-t border-cream/10"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex gap-6">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href}
                      className="text-cream/40 text-xs tracking-[0.3em] uppercase hover:text-cream transition-colors duration-200 font-sans">
                      {s.label}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <a href="mailto:hello@halu.coffee"
                    className="text-cream/40 text-xs tracking-wider hover:text-cream transition-colors font-sans">
                    hello@halu.coffee
                  </a>
                  <span className="text-cream/20 text-xs tracking-wider font-sans">Bandung, Indonesia</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
