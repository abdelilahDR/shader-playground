import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

// GLSL Fragment Shader for Checkerboard
const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uCells;
  uniform vec2 uResolution;

  void main() {
    // Calculate aspect ratio for square cells
    float aspect = uResolution.x / uResolution.y;

    // Scale UVs by number of cells
    vec2 scaledUv = vUv * uCells;
    scaledUv.x *= aspect > 1.0 ? aspect : 1.0;
    scaledUv.y *= aspect < 1.0 ? 1.0 / aspect : 1.0;

    // Create checkerboard pattern
    float checker = mod(floor(scaledUv.x) + floor(scaledUv.y), 2.0);

    // Mix colors based on checker value
    vec3 color = mix(uColorA, uColorB, checker);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Checkerboard - A classic checkerboard pattern shader
 *
 * Props:
 * - colorA: First color (hex string)
 * - colorB: Second color (hex string)
 * - cells: Number of cells along the shortest edge
 */
export default function Checkerboard({
  colorA = '#667eea',
  colorB = '#3b2f63',
  cells = 8
}) {
  const uniforms = useMemo(() => ({
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uCells: { value: cells }
  }), [colorA, colorB, cells])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

// Metadata for the shader playground
Checkerboard.shaderMeta = {
  name: 'Checkerboard',
  category: 'Patterns',
  description: 'Classic checkerboard pattern with two alternating colors',
  requiresChild: false,
  props: [
    {
      name: 'colorA',
      type: 'color',
      default: '#667eea',
      description: 'First color of the checkerboard pattern',
      group: 'Colors',
      label: 'Color A'
    },
    {
      name: 'colorB',
      type: 'color',
      default: '#3b2f63',
      description: 'Second color of the checkerboard pattern',
      group: 'Colors',
      label: 'Color B'
    },
    {
      name: 'cells',
      type: 'range',
      default: 8,
      min: 1,
      max: 50,
      step: 1,
      description: 'Number of cells along the shortest canvas edge',
      group: 'Effect',
      label: 'Cells'
    }
  ]
}
