import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import AnimatedHero from './components/AnimatedHero'
import BooksSection from './components/BooksSection'
import ExpertsSection from './components/ExpertsSection'
import UserExperienceSection from './components/UserExperienceSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    let rafId = null
    const readScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const total = scrollHeight - clientHeight
      setScrollY(y)
      setScrollProgress(total > 0 ? Math.min(y / total, 1) : 0)
    }
    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(readScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    readScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <div ref={scrollRef} className="app">
        <div className="canvas-wrap">
          <AnimatedHero mouseX={mouse.x} mouseY={mouse.y} />
          <Canvas
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              stencil: false,
              depth: true,
            }}
            shadows
            camera={{ position: [0, 2, 12], fov: 45, near: 0.1, far: 200 }}
          >
            <Scene scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        <Overlay scrollProgress={scrollProgress} scrollY={scrollY} isLoaded={isLoaded} />

        <div className="scroll-sections">
          <section className="hero-spacer" aria-hidden="true" />
          <BooksSection mouseX={mouse.x} mouseY={mouse.y} />
          <ExpertsSection />
          <UserExperienceSection />
          <Footer mouseX={mouse.x} mouseY={mouse.y} />
        </div>
      </div>
    </>
  )
}

export default App
