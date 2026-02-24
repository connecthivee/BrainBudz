import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import './HeroSequence.css'

const FRAME_COUNT = 240
const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/'
const SEQUENCE_BASE = `${base}pic/hero/hero_pic`

function pad(n) {
  return String(n).padStart(3, '0')
}

function scrollProgressToFrameIndex(progress) {
  const index = Math.floor(progress * FRAME_COUNT)
  return Math.max(0, Math.min(index, FRAME_COUNT - 1))
}

/* Smooth fade-out: start at 0.4, end at 1.0 with ease-out curve (no sudden pop) */
function scrollProgressToOpacity(progress) {
  if (progress <= 0.4) return 1
  if (progress >= 1) return 0
  const t = (progress - 0.4) / 0.6
  const easeOut = 1 - (1 - t) * (1 - t)
  return 1 - easeOut
}

function getScrollProgress() {
  const scrollY = window.scrollY ?? document.documentElement.scrollTop
  const vh = window.innerHeight || 1
  return Math.min(scrollY / vh, 1)
}

export default function HeroSequence() {
  const [frameIndex, setFrameIndex] = useState(0)
  const opacity = useMotionValue(1)
  const rafIdRef = useRef(null)
  const lastFrameRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      const progress = getScrollProgress()
      const newFrameIndex = scrollProgressToFrameIndex(progress)
      const newOpacity = scrollProgressToOpacity(progress)

      opacity.set(newOpacity)

      if (newFrameIndex !== lastFrameRef.current) {
        lastFrameRef.current = newFrameIndex
        setFrameIndex(newFrameIndex)
      }

      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [opacity])

  const frameNum = frameIndex + 1
  const src = `${SEQUENCE_BASE}/ezgif-frame-${pad(frameNum)}.jpg`

  return (
    <motion.div
      className="hero-sequence"
      aria-hidden="true"
      style={{ opacity }}
    >
      <img
        key={frameNum}
        className="hero-sequence-img"
        src={src}
        alt=""
        draggable={false}
      />
      <div className="hero-sequence-side hero-sequence-side-left" aria-hidden="true" />
      <div className="hero-sequence-side hero-sequence-side-right" aria-hidden="true" />
    </motion.div>
  )
}
