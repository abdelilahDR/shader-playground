import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

/**
 * ShaderMaterial - Renders a fullscreen shader with custom uniforms
 */
function ShaderMesh({ fragmentShader, vertexShader, uniforms = {}, children }) {
  const meshRef = useRef()
  const { size } = useThree()

  // Default vertex shader for fullscreen quad
  const defaultVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  // Merge default uniforms with custom uniforms
  const shaderUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    ...uniforms
  }), [uniforms, size])

  // Update time uniform on each frame
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  // Update resolution on resize
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height)
    }
  }, [size])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader || defaultVertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms}
      />
    </mesh>
  )
}

/**
 * ShaderCanvas - Main wrapper component for rendering shaders
 * Replaces the 'shaders' package's <Shader> component
 */
export default function ShaderCanvas({ children, style = {}, className = '' }) {
  return (
    <div style={{ width: '100%', height: '100%', ...style }} className={className}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </Canvas>
    </div>
  )
}

// Export the shader mesh for use in custom shaders
export { ShaderMesh }
