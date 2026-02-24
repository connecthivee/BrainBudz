import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './Overlay.css'

const logoImg = new URL('../../pic/logo.png', import.meta.url).href

/** Scroll distance (px) over which logo moves from center to top-left */
const LOGO_SCROLL_RANGE = 140

export default function Overlay({ scrollProgress, scrollY = 0, isLoaded }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [logoAnimating, setLogoAnimating] = useState(false)
  const cursorRef = useRef(null)
  const logoTimeoutRef = useRef(null)

  const onLogoClick = () => {
    if (logoTimeoutRef.current) clearTimeout(logoTimeoutRef.current)
    setLogoAnimating(true)
    logoTimeoutRef.current = setTimeout(() => {
      setLogoAnimating(false)
      logoTimeoutRef.current = null
    }, 420)
  }

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMouse((m) => ({ x: m.x + (x - m.x) * 0.15, y: m.y + (y - m.y) * 0.15 }))
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Ease-out helper for smooth reveal (no pop)
  const easeOut = (t) => 1 - (1 - t) * (1 - t)

  // Logo: start big in center, shrink and move to top-left over first LOGO_SCROLL_RANGE px of scroll
  const logoT = Math.min((scrollY ?? 0) / LOGO_SCROLL_RANGE, 1)

  // Nav tab: hidden initially, fades in as user scroll (same range as logo moving to corner)
  const navOpacity = logoT

  // Scroll hint: smooth fade out
  const scrollHintOpacity = scrollProgress < 0.12 ? 1 : Math.max(0, 1 - easeOut((scrollProgress - 0.12) / 0.2))

  return (
    <div className={`overlay ${isLoaded ? 'loaded' : ''}`}>
      <div
        className="cursor-glow"
        ref={cursorRef}
        style={{
          background: `radial-gradient(circle at center, rgba(102,204,255,0.06) 0%, transparent 70%)`,
          transform: `translate(-50%, -50%) scale(${1 + (mouse.x - 0.5) * 0.5})`,
        }}
        aria-hidden="true"
      />

      {createPortal(
        <div className="persistent-header" style={{ '--logo-t': logoT }}>
          <div className="logo-hero-to-corner">
            <a
              href="/"
              className={`logo ${logoAnimating ? 'logo--animating' : ''}`}
              onClick={onLogoClick}
            >
              <span className="logo-wrap">
                <img src={logoImg} alt="BrainBudz" className="logo-img" />
              </span>
            </a>
          </div>
          <header className="persistent-nav" style={{ opacity: navOpacity }}>
            <div className="nav-panel nav-panel-bg">
              <nav className="nav-links">
                <a href="#books">Books</a>
                <a href="#experts">Our Experts</a>
                <a href="#user-experience">Experience</a>
              </nav>
            </div>
          </header>
        </div>,
        document.body
      )}

      <div className="scroll-hint" style={{ opacity: scrollHintOpacity }}>
        <span className="scroll-hint-text">Scroll to explore</span>
        <div className="scroll-hint-line" />
      </div>
    </div>
  )
}
