import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function CinematicLighting() {
  const sunRef = useRef()

  useFrame((state) => {
    if (!sunRef.current) return
    const t = state.clock.elapsedTime * 0.05
    sunRef.current.position.x = Math.sin(t) * 3
    sunRef.current.position.z = 12 + Math.cos(t) * 2
    sunRef.current.position.y = 14 + Math.sin(t * 0.7) * 2
  })

  return (
    <>
      <ambientLight intensity={0.25} />
      <hemisphereLight
        args={['#7ac5f9', '#0f131c', 0.55]}
      />
      <directionalLight
        ref={sunRef}
        position={[5, 14, 10]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={80}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0002}
      />
      <pointLight position={[-4, 6, 4]} intensity={0.35} color="#66ccff" />
      <pointLight position={[4, 5, 6]} intensity={0.3} color="#7ac5f9" />
    </>
  )
}
