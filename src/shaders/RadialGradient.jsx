import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec2 uCenter;
  uniform float uRadius;
  uniform float uSoftness;
  uniform vec2 uResolution;

  void main() {
    // Correct for aspect ratio
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;
    vec2 center = uCenter;
    center.x *= aspect;

    // Calculate distance from center
    float dist = distance(uv, center);

    // Create gradient with softness
    float t = smoothstep(uRadius - uSoftness, uRadius + uSoftness, dist);
    t = clamp(t, 0.0, 1.0);

    // Mix colors (center to edge)
    vec3 color = mix(uColorA, uColorB, t);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * RadialGradient - Circular gradient from center outward
 */
export default function RadialGradient({
  colorA = '#667eea',
  colorB = '#0a0a0b',
  centerX = 0.5,
  centerY = 0.5,
  radius = 0.5,
  softness = 0.3
}) {
  const uniforms = useMemo(() => ({
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uCenter: { value: new THREE.Vector2(centerX, centerY) },
    uRadius: { value: radius },
    uSoftness: { value: softness }
  }), [colorA, colorB, centerX, centerY, radius, softness])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

RadialGradient.shaderMeta = {
  name: 'RadialGradient',
  category: 'Gradients',
  description: 'Circular gradient radiating from a center point',
  requiresChild: false,
  props: [
    { name: 'colorA', type: 'color', default: '#667eea', group: 'Colors', label: 'Center Color' },
    { name: 'colorB', type: 'color', default: '#0a0a0b', group: 'Colors', label: 'Edge Color' },
    { name: 'centerX', type: 'range', default: 0.5, min: 0, max: 1, step: 0.01, group: 'Position', label: 'Center X' },
    { name: 'centerY', type: 'range', default: 0.5, min: 0, max: 1, step: 0.01, group: 'Position', label: 'Center Y' },
    { name: 'radius', type: 'range', default: 0.5, min: 0.1, max: 2, step: 0.01, group: 'Effect', label: 'Radius' },
    { name: 'softness', type: 'range', default: 0.3, min: 0, max: 1, step: 0.01, group: 'Effect', label: 'Softness' }
  ]
}
