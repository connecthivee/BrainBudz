import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'

const islandVertexShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDist;
  void main() {
    vUv = uv;
    float d = length(position.xz) / 6.0;
    vDist = d;
    float wave = sin(d * 8.0 - uTime * 0.5) * 0.02;
    float mouseDist = length(uv - uMouse);
    float pull = 0.018 * exp(-mouseDist * 3.5);
    float h = wave + pull + (1.0 - d) * 0.1;
    vElevation = h;
    vec3 pos = position + normal * h;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const islandFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDist;
  void main() {
    float mixStrength = vElevation * 3.0 + vUv.y * 0.4;
    vec3 col = mix(uColor1, uColor2, mixStrength);
    float edge = 1.0 - smoothstep(0.92, 0.98, vDist);
    col *= 0.88 + 0.12 * edge;
    gl_FragColor = vec4(col, 1.0);
  }
`

export default function FloatingIsland() {
  const meshRef = useRef()
  const materialRef = useRef()
  const mouseUniform = useRef({ value: new THREE.Vector2(0.5, 0.5) })

  const geo = useMemo(() => {
    const g = new THREE.CircleGeometry(6, 64)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    const pointer = state.pointer
    const mouseX = pointer?.mouse?.x ?? 0
    const mouseY = pointer?.mouse?.y ?? 0
    mouseUniform.current.value.lerp(
      new THREE.Vector2(mouseX * 0.5 + 0.5, mouseY * 0.5 + 0.5),
      0.08
    )
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uMouse.value.copy(mouseUniform.current.value)
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color('#3d2914') },
      uColor2: { value: new THREE.Color('#5c3d1e') },
    }),
    []
  )

  return (
    <group position={[0, -1.2, 0]}>
      <mesh ref={meshRef} geometry={geo} rotation={[0, 0, 0]} receiveShadow>
        <shaderMaterial
          ref={materialRef}
          vertexShader={islandVertexShader}
          fragmentShader={islandFragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
          flatShading={false}
        />
      </mesh>
      {/* Soft rim / grass ring */}
      <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <meshStandardMaterial
          color="#2d4a1e"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
