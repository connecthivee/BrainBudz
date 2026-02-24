import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SYMBOLS = ['A', 'B', '1', '2', '+', '•', '★', '◆']
const COUNT = 120

export default function SymbolParticles() {
  const pointsRef = useRef()
  const { positions, symbols } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const symbols = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2
      symbols[i] = Math.floor(Math.random() * SYMBOLS.length)
    }
    return { positions, symbols }
  }, [])

  const offsets = useMemo(() => {
    const o = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) o[i] = Math.random() * Math.PI * 2
    return o
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.attributes.position
    for (let i = 0; i < COUNT; i++) {
      posAttr.array[i * 3 + 1] += Math.sin(t + offsets[i]) * 0.002
      posAttr.array[i * 3] += Math.cos(t * 0.7 + offsets[i] * 0.5) * 0.001
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-symbol"
          count={COUNT}
          array={symbols}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#66CCFF"
        sizeAttenuation
      />
    </points>
  )
}
