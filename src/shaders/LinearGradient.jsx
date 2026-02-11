import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

// GLSL Fragment Shader for Linear Gradient
const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uAngle;

  void main() {
    // Convert angle to radians and calculate gradient direction
    float rad = uAngle * 3.14159265 / 180.0;
    vec2 dir = vec2(cos(rad), sin(rad));

    // Calculate gradient factor based on UV and direction
    float t = dot(vUv - 0.5, dir) + 0.5;
    t = clamp(t, 0.0, 1.0);

    // Mix colors
    vec3 color = mix(uColorA, uColorB, t);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * LinearGradient - A simple linear gradient shader
 *
 * Props:
 * - colorA: Start color (hex string, e.g., "#ff0000")
 * - colorB: End color (hex string, e.g., "#0000ff")
 * - angle: Gradient angle in degrees (0 = left-to-right, 90 = bottom-to-top)
 */
export default function LinearGradient({
  colorA = '#667eea',
  colorB = '#764ba2',
  angle = 135
}) {
  // Convert hex colors to Three.js Color objects
  const uniforms = useMemo(() => ({
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uAngle: { value: angle }
  }), [colorA, colorB, angle])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

// Metadata for the shader playground
LinearGradient.shaderMeta = {
  name: 'LinearGradient',
  category: 'Gradients',
  description: 'A smooth linear gradient between two colors',
  requiresChild: false,
  props: [
    {
      name: 'colorA',
      type: 'color',
      default: '#667eea',
      description: 'Start color of the gradient',
      group: 'Colors',
      label: 'Color A'
    },
    {
      name: 'colorB',
      type: 'color',
      default: '#764ba2',
      description: 'End color of the gradient',
      group: 'Colors',
      label: 'Color B'
    },
    {
      name: 'angle',
      type: 'range',
      default: 135,
      min: 0,
      max: 360,
      step: 1,
      description: 'Angle of the gradient in degrees',
      group: 'Effect',
      label: 'Angle'
    }
  ]
}
