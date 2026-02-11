/**
 * Custom Shader Components
 *
 * Independent implementations using Three.js and GLSL,
 * replacing the proprietary 'shaders' npm package.
 */

// Core wrapper
export { default as ShaderCanvas, ShaderMesh } from '../lib/ShaderCanvas'

// Gradient shaders
export { default as LinearGradient } from './LinearGradient'
export { default as RadialGradient } from './RadialGradient'
export { default as Gradient3 } from './Gradient3'

// Pattern shaders
export { default as Checkerboard } from './Checkerboard'
export { default as Grid } from './Grid'

// Texture shaders
export { default as SimplexNoise } from './SimplexNoise'
export { default as Plasma } from './Plasma'
export { default as Voronoi } from './Voronoi'
export { default as Aurora } from './Aurora'

// Basic shaders
export { default as SolidColor } from './SolidColor'

// Distortion shaders
export { default as Waves } from './Waves'
export { default as Ripple } from './Ripple'
export { default as Swirl } from './Swirl'
export { default as Kaleidoscope } from './Kaleidoscope'

// Stylize shaders
export { default as Pixelate } from './Pixelate'
export { default as Halftone } from './Halftone'
export { default as Scanlines } from './Scanlines'
export { default as Glitch } from './Glitch'

// Adjustment shaders
export { default as Vignette } from './Vignette'
export { default as HueRotate } from './HueRotate'
export { default as Duotone } from './Duotone'

// Import all for metadata collection
import LinearGradient from './LinearGradient'
import RadialGradient from './RadialGradient'
import Gradient3 from './Gradient3'
import Checkerboard from './Checkerboard'
import Grid from './Grid'
import SimplexNoise from './SimplexNoise'
import Plasma from './Plasma'
import Voronoi from './Voronoi'
import Aurora from './Aurora'
import SolidColor from './SolidColor'
import Waves from './Waves'
import Ripple from './Ripple'
import Swirl from './Swirl'
import Kaleidoscope from './Kaleidoscope'
import Pixelate from './Pixelate'
import Halftone from './Halftone'
import Scanlines from './Scanlines'
import Glitch from './Glitch'
import Vignette from './Vignette'
import HueRotate from './HueRotate'
import Duotone from './Duotone'

// Collect all shader metadata for the playground
export const customShaders = [
  // Gradients
  LinearGradient.shaderMeta,
  RadialGradient.shaderMeta,
  Gradient3.shaderMeta,
  // Patterns
  Checkerboard.shaderMeta,
  Grid.shaderMeta,
  // Textures
  SimplexNoise.shaderMeta,
  Plasma.shaderMeta,
  Voronoi.shaderMeta,
  Aurora.shaderMeta,
  // Basics
  SolidColor.shaderMeta,
  // Distortions
  Waves.shaderMeta,
  Ripple.shaderMeta,
  Swirl.shaderMeta,
  Kaleidoscope.shaderMeta,
  // Stylize
  Pixelate.shaderMeta,
  Halftone.shaderMeta,
  Scanlines.shaderMeta,
  Glitch.shaderMeta,
  // Adjustments
  Vignette.shaderMeta,
  HueRotate.shaderMeta,
  Duotone.shaderMeta
]

// Export all shaders as a single object
export const ShaderComponents = {
  LinearGradient,
  RadialGradient,
  Gradient3,
  Checkerboard,
  Grid,
  SimplexNoise,
  Plasma,
  Voronoi,
  Aurora,
  SolidColor,
  Waves,
  Ripple,
  Swirl,
  Kaleidoscope,
  Pixelate,
  Halftone,
  Scanlines,
  Glitch,
  Vignette,
  HueRotate,
  Duotone
}
