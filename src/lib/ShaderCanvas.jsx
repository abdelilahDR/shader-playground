import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'

/**
 * ShaderMesh - Renders a fullscreen shader with custom uniforms
 */
function ShaderMesh({ fragmentShader, vertexShader, uniforms = {} }) {
  const meshRef = useRef()
  const { size } = useThree()

  const defaultVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const shaderUniforms = useMemo(() => {
    const baseUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    }

    Object.keys(uniforms).forEach(key => {
      baseUniforms[key] = { value: uniforms[key].value }
    })

    return baseUniforms
  }, [])

  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      Object.keys(uniforms).forEach(key => {
        if (meshRef.current.material.uniforms[key]) {
          meshRef.current.material.uniforms[key].value = uniforms[key].value
        }
      })
    }
  }, [uniforms])

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height)
    }
  }, [size])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        key={fragmentShader}
        vertexShader={vertexShader || defaultVertexShader}
        fragmentShader={fragmentShader}
        uniforms={shaderUniforms}
      />
    </mesh>
  )
}

/**
 * CanvasExporter - Internal component to expose GL context for export
 */
function CanvasExporter({ onReady }) {
  const { gl } = useThree()

  useEffect(() => {
    if (onReady) {
      onReady(gl)
    }
  }, [gl, onReady])

  return null
}

/**
 * ShaderCanvas - Main wrapper component for rendering shaders
 */
const ShaderCanvas = forwardRef(function ShaderCanvas(
  { children, style = {}, className = '', width, height },
  ref
) {
  const glRef = useRef(null)

  useImperativeHandle(ref, () => ({
    // Export as PNG data URL
    toDataURL: (type = 'image/png', quality = 1) => {
      if (glRef.current) {
        return glRef.current.domElement.toDataURL(type, quality)
      }
      return null
    },
    // Export as Blob
    toBlob: (callback, type = 'image/png', quality = 1) => {
      if (glRef.current) {
        glRef.current.domElement.toBlob(callback, type, quality)
      }
    },
    // Get canvas element
    getCanvas: () => {
      if (glRef.current) {
        return glRef.current.domElement
      }
      return null
    }
  }))

  const canvasStyle = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%'
  }

  return (
    <div style={{ width: '100%', height: '100%', ...style }} className={className}>
      <Canvas
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={canvasStyle}
      >
        <CanvasExporter onReady={(gl) => { glRef.current = gl }} />
        {children}
      </Canvas>
    </div>
  )
})

export default ShaderCanvas
export { ShaderMesh }
