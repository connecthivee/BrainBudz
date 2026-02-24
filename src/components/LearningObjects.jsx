import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

function WoodAlphabet() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
  })
  return (
    <group ref={ref} position={[-2.2, 0.3, 0.5]}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
        <RoundedBox args={[0.5, 0.7, 0.12]} radius={0.04} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color="#c4a35a" roughness={0.7} metalness={0.1} />
        </RoundedBox>
        <Text
          position={[0, 0, 0.07]}
          fontSize={0.45}
          color="#2d2315"
          anchorX="center"
          anchorY="middle"
        >
          A
        </Text>
      </Float>
    </group>
  )
}

function TactileBooks() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35 + 1) * 0.1
  })
  return (
    <group ref={ref} position={[2, 0.25, 0.3]}>
      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.12}>
        <group>
          <RoundedBox args={[0.9, 0.15, 0.65]} radius={0.02} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#8b4513" roughness={0.8} metalness={0} />
          </RoundedBox>
          <RoundedBox args={[0.88, 0.15, 0.63]} radius={0.02} smoothness={4} position={[0, 0.18, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#a0522d" roughness={0.8} metalness={0} />
          </RoundedBox>
          <RoundedBox args={[0.86, 0.15, 0.61]} radius={0.02} smoothness={4} position={[0, 0.36, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#cd853f" roughness={0.8} metalness={0} />
          </RoundedBox>
        </group>
      </Float>
    </group>
  )
}

function PuzzleBoard() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25 + 2) * 0.12
  })
  return (
    <group ref={ref} position={[0, 0.35, 1.2]}>
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.1}>
        <group>
          <RoundedBox args={[1.1, 0.08, 0.9]} radius={0.03} smoothness={4} castShadow receiveShadow>
            <meshStandardMaterial color="#4a3728" roughness={0.75} metalness={0} />
          </RoundedBox>
          <RoundedBox args={[0.35, 0.1, 0.35]} radius={0.02} smoothness={4} position={[-0.3, 0.06, -0.2]} castShadow>
            <meshStandardMaterial color="#e8b86d" roughness={0.6} metalness={0} />
          </RoundedBox>
          <RoundedBox args={[0.35, 0.1, 0.35]} radius={0.02} smoothness={4} position={[0.25, 0.06, -0.15]} castShadow>
            <meshStandardMaterial color="#c9956a" roughness={0.6} metalness={0} />
          </RoundedBox>
          <RoundedBox args={[0.35, 0.1, 0.35]} radius={0.02} smoothness={4} position={[0, 0.06, 0.25]} castShadow>
            <meshStandardMaterial color="#d4a574" roughness={0.6} metalness={0} />
          </RoundedBox>
        </group>
      </Float>
    </group>
  )
}

function CountingCoins() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + 0.5) * 0.08
  })
  return (
    <group ref={ref} position={[-1, 0.2, -0.8]}>
      <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.18}>
        <group>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.06, 32]} />
            <meshStandardMaterial color="#c9b037" roughness={0.35} metalness={0.7} />
          </mesh>
          <mesh position={[0.5, 0.02, 0.1]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
            <meshStandardMaterial color="#b8a02e" roughness={0.4} metalness={0.65} />
          </mesh>
          <mesh position={[-0.35, 0.04, 0.15]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
            <meshStandardMaterial color="#d4bc48" roughness={0.35} metalness={0.7} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

function SecondLetter() {
  const ref = useRef()
  return (
    <group ref={ref} position={[1.8, 0.25, -0.5]}>
      <Float speed={1.6} rotationIntensity={0.1} floatIntensity={0.14}>
        <RoundedBox args={[0.45, 0.6, 0.1]} radius={0.03} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color="#b8956a" roughness={0.7} metalness={0.1} />
        </RoundedBox>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.38}
          color="#2d2315"
          anchorX="center"
          anchorY="middle"
        >
          B
        </Text>
      </Float>
    </group>
  )
}

const BASE_POSITIONS = [
  [-2.2, 0.3, 0.5],
  [1.8, 0.25, -0.5],
  [2, 0.25, 0.3],
  [0, 0.35, 1.2],
  [-1, 0.2, -0.8],
]

export default function LearningObjects({ scrollProgress }) {
  const groupRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0, world: new THREE.Vector3() })

  useFrame((state) => {
    if (!groupRef.current) return
    const { camera, pointer } = state
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.06
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.06
    state.raycaster.setFromCamera(
      { x: mouseRef.current.x, y: mouseRef.current.y },
      camera
    )
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const target = new THREE.Vector3()
    state.raycaster.ray.intersectPlane(plane, target)
    mouseRef.current.world.lerp(target, 0.08)
    const strength = 0.18 * (1 - scrollProgress)
    groupRef.current.children.forEach((child, i) => {
      if (!child.position || !BASE_POSITIONS[i]) return
      const [bx, , bz] = BASE_POSITIONS[i]
      const dx = mouseRef.current.world.x - bx
      const dz = mouseRef.current.world.z - bz
      const dist = Math.sqrt(dx * dx + dz * dz) + 0.01
      const pull = Math.min(strength / dist, 0.2)
      child.position.x = bx + dx * pull
      child.position.z = bz + dz * pull
    })
  })

  const scale = 1 - scrollProgress * 0.4
  const opacity = 1 - scrollProgress * 0.9

  return (
    <group ref={groupRef} scale={scale} visible={opacity > 0.01}>
      <WoodAlphabet />
      <SecondLetter />
      <TactileBooks />
      <PuzzleBoard />
      <CountingCoins />
    </group>
  )
}
