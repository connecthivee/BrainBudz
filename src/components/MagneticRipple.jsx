import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const rippleVertexShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  varying float vRipple;
  void main() {
    vec2 uv = position.xy * 0.5 + 0.5;
    float d = length(uv - uMouse);
    vRipple = exp(-d * 3.0) * sin(d * 20.0 - uTime * 2.0) * 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
    gl_PointSize = 2.0;
  }
`

const rippleFragmentShader = `
  varying float vRipple;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, vRipple * 0.05);
  }
`

export default function MagneticRipple() {
  const materialRef = useRef()
  const mouseUniform = useRef({ value: new THREE.Vector2(0.5, 0.5) })

  const positions = useMemo(() => {
    const arr = []
    const res = 60
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        arr.push((i / res) * 2 - 1, (j / res) * 2 - 1, 0)
      }
    }
    return new Float32Array(arr)
  }, [])

  useFrame((state) => {
    if (!materialRef.current) return
    const pointer = state.pointer
    const mouseX = pointer?.mouse?.x ?? 0
    const mouseY = pointer?.mouse?.y ?? 0
    mouseUniform.current.value.lerp(
      new THREE.Vector2(mouseX * 0.5 + 0.5, mouseY * 0.5 + 0.5),
      0.05
    )
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uMouse.value.copy(mouseUniform.current.value)
  })

  const uniforms = useRef({
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
  })

  return (
    <points position={[0, 0, 8]} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={rippleVertexShader}
        fragmentShader={rippleFragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
