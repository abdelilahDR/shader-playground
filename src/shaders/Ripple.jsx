import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec2 uCenter;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = vUv;

    // Correct for aspect ratio
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;
    vec2 center = uCenter;
    center.x *= aspect;

    // Calculate distance from center
    float dist = distance(uv, center);

    // Create ripple effect
    float t = uTime * uSpeed;
    float ripple = sin(dist * uFrequency - t) * uAmplitude;

    // Create color gradient based on ripple
    float colorMix = ripple * 0.5 + 0.5;
    colorMix = clamp(colorMix, 0.0, 1.0);

    // Add radial fade
    float fade = 1.0 - smoothstep(0.0, 1.0, dist);
    colorMix *= fade;

    vec3 color = mix(uColorA, uColorB, colorMix);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Ripple - Animated ripple effect from center point
 */
export default function Ripple({
  speed = 2,
  frequency = 20,
  amplitude = 1,
  centerX = 0.5,
  centerY = 0.5,
  colorA = '#0a0a0b',
  colorB = '#667eea'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uFrequency: { value: frequency },
    uAmplitude: { value: amplitude },
    uCenter: { value: new THREE.Vector2(centerX, centerY) },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) }
  }), [speed, frequency, amplitude, centerX, centerY, colorA, colorB])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Ripple.shaderMeta = {
  name: 'Ripple',
  category: 'Distortions',
  description: 'Animated ripple effect emanating from center',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 2, min: 0, max: 5, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'frequency', type: 'range', default: 20, min: 5, max: 50, step: 1, group: 'Effect', label: 'Frequency' },
    { name: 'amplitude', type: 'range', default: 1, min: 0.1, max: 2, step: 0.1, group: 'Effect', label: 'Amplitude' },
    { name: 'centerX', type: 'range', default: 0.5, min: 0, max: 1, step: 0.01, group: 'Position', label: 'Center X' },
    { name: 'centerY', type: 'range', default: 0.5, min: 0, max: 1, step: 0.01, group: 'Position', label: 'Center Y' },
    { name: 'colorA', type: 'color', default: '#0a0a0b', group: 'Colors', label: 'Background' },
    { name: 'colorB', type: 'color', default: '#667eea', group: 'Colors', label: 'Ripple Color' }
  ]
}
