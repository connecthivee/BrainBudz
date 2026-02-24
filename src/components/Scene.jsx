import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import FloatingIsland from './FloatingIsland'
import LearningObjects from './LearningObjects'
import SymbolParticles from './SymbolParticles'
import MagneticRipple from './MagneticRipple'
import CinematicLighting from './CinematicLighting'

export default function Scene({ scrollProgress }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const scroll = scrollProgress
    groupRef.current.position.y = -scroll * 8
    groupRef.current.rotation.y = scroll * 0.15
  })

  return (
    <>
      <fog attach="fog" args={['#0a0e14', 18, 45]} />
      <CinematicLighting />
      <Environment preset="sunset" environmentIntensity={0.4} />
      <MagneticRipple />
      <group ref={groupRef}>
        <FloatingIsland />
        <LearningObjects scrollProgress={scrollProgress} />
      </group>
      <SymbolParticles />
    </>
  )
}
