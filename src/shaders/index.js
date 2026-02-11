/**
 * Custom Shader Components
 *
 * These are independent implementations using Three.js and GLSL,
 * replacing the proprietary 'shaders' npm package.
 */

// Core wrapper
export { default as ShaderCanvas, ShaderMesh } from '../lib/ShaderCanvas'

// Gradient shaders
export { default as LinearGradient } from './LinearGradient'

// Pattern shaders
export { default as Checkerboard } from './Checkerboard'

// Collect all shader metadata for the playground
import LinearGradient from './LinearGradient'
import Checkerboard from './Checkerboard'

export const customShaders = [
  LinearGradient.shaderMeta,
  Checkerboard.shaderMeta
]

// Export all shaders as a single object (for compatibility with existing code)
export const ShaderComponents = {
  LinearGradient,
  Checkerboard,
  // ShaderCanvas replaces the <Shader> wrapper
  Shader: ({ children, style }) => (
    <div style={{ width: '100%', height: '100%', ...style }}>{children}</div>
  )
}
