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
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform int uDirection; // 0 = horizontal, 1 = vertical, 2 = both

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;

    float wave;
    if (uDirection == 0) {
      // Horizontal waves
      wave = sin(uv.y * uFrequency + t) * uAmplitude;
      uv.x += wave;
    } else if (uDirection == 1) {
      // Vertical waves
      wave = sin(uv.x * uFrequency + t) * uAmplitude;
      uv.y += wave;
    } else {
      // Both directions
      float waveX = sin(uv.y * uFrequency + t) * uAmplitude;
      float waveY = sin(uv.x * uFrequency + t * 0.7) * uAmplitude;
      uv.x += waveX;
      uv.y += waveY;
    }

    // Create gradient based on displaced UV
    float gradient = (uv.x + uv.y) * 0.5;
    gradient = fract(gradient * 2.0);

    vec3 color = mix(uColorA, uColorB, gradient);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Waves - Animated wave distortion effect
 */
export default function Waves({
  speed = 1,
  frequency = 10,
  amplitude = 0.05,
  colorA = '#667eea',
  colorB = '#764ba2',
  direction = 2
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uFrequency: { value: frequency },
    uAmplitude: { value: amplitude },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uDirection: { value: direction }
  }), [speed, frequency, amplitude, colorA, colorB, direction])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Waves.shaderMeta = {
  name: 'Waves',
  category: 'Distortions',
  description: 'Animated wave distortion effect',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 1, min: 0, max: 5, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'frequency', type: 'range', default: 10, min: 1, max: 30, step: 1, group: 'Effect', label: 'Frequency' },
    { name: 'amplitude', type: 'range', default: 0.05, min: 0.01, max: 0.2, step: 0.01, group: 'Effect', label: 'Amplitude' },
    { name: 'colorA', type: 'color', default: '#667eea', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#764ba2', group: 'Colors', label: 'Color B' },
    { name: 'direction', type: 'range', default: 2, min: 0, max: 2, step: 1, group: 'Effect', label: 'Direction (0=H, 1=V, 2=Both)' }
  ]
}
