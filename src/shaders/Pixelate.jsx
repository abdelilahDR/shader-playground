import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uPixelSize;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uAnimated;

  // Simple hash function for pseudo-random colors
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    // Pixelate the UV coordinates
    vec2 pixelUv = floor(vUv / uPixelSize) * uPixelSize;

    // Create a pattern based on pixelated position
    float h = hash(pixelUv);

    // Add optional animation
    float t = uAnimated > 0.5 ? uTime * 0.5 : 0.0;
    h = fract(h + t * 0.1);

    // Create color from three-color palette
    vec3 color;
    if (h < 0.33) {
      color = uColorA;
    } else if (h < 0.66) {
      color = uColorB;
    } else {
      color = uColorC;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Pixelate - Retro pixel art effect
 */
export default function Pixelate({
  pixelSize = 0.05,
  colorA = '#ff6b6b',
  colorB = '#4ecdc4',
  colorC = '#45b7d1',
  animated = false
}) {
  const uniforms = useMemo(() => ({
    uPixelSize: { value: pixelSize },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uColorC: { value: new THREE.Color(colorC) },
    uAnimated: { value: animated ? 1.0 : 0.0 }
  }), [pixelSize, colorA, colorB, colorC, animated])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Pixelate.shaderMeta = {
  name: 'Pixelate',
  category: 'Stylize',
  description: 'Retro pixel art mosaic effect',
  requiresChild: false,
  props: [
    { name: 'pixelSize', type: 'range', default: 0.05, min: 0.01, max: 0.2, step: 0.01, group: 'Effect', label: 'Pixel Size' },
    { name: 'colorA', type: 'color', default: '#ff6b6b', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#4ecdc4', group: 'Colors', label: 'Color B' },
    { name: 'colorC', type: 'color', default: '#45b7d1', group: 'Colors', label: 'Color C' },
    { name: 'animated', type: 'range', default: 0, min: 0, max: 1, step: 1, group: 'Animation', label: 'Animated (0=Off, 1=On)' }
  ]
}
