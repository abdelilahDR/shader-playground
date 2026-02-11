import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uStrength;
  uniform float uRadius;
  uniform vec2 uCenter;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = vUv;

    // Correct for aspect ratio
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = uv - uCenter;
    centeredUv.x *= aspect;

    // Calculate distance and angle from center
    float dist = length(centeredUv);
    float angle = atan(centeredUv.y, centeredUv.x);

    // Apply swirl based on distance
    float swirlAmount = uStrength * smoothstep(uRadius, 0.0, dist);
    angle += swirlAmount + uTime * uSpeed;

    // Convert back to UV
    vec2 swirlUv;
    swirlUv.x = cos(angle) * dist / aspect + uCenter.x;
    swirlUv.y = sin(angle) * dist + uCenter.y;

    // Create gradient pattern
    float pattern = sin(swirlUv.x * 10.0) * sin(swirlUv.y * 10.0);
    pattern = pattern * 0.5 + 0.5;

    vec3 color = mix(uColorA, uColorB, pattern);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Swirl - Spiral distortion effect
 */
export default function Swirl({
  speed = 0.5,
  strength = 3,
  radius = 0.8,
  centerX = 0.5,
  centerY = 0.5,
  colorA = '#667eea',
  colorB = '#764ba2'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uStrength: { value: strength },
    uRadius: { value: radius },
    uCenter: { value: new THREE.Vector2(centerX, centerY) },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) }
  }), [speed, strength, radius, centerX, centerY, colorA, colorB])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Swirl.shaderMeta = {
  name: 'Swirl',
  category: 'Distortions',
  description: 'Animated spiral distortion effect',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 0.5, min: 0, max: 2, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'strength', type: 'range', default: 3, min: 0, max: 10, step: 0.5, group: 'Effect', label: 'Strength' },
    { name: 'radius', type: 'range', default: 0.8, min: 0.1, max: 2, step: 0.1, group: 'Effect', label: 'Radius' },
    { name: 'centerX', type: 'range', default: 0.5, min: 0, max: 1, step: 0.01, group: 'Position', label: 'Center X' },
    { name: 'centerY', type: 'range', default: 0.5, min: 0, max: 1, step: 0.01, group: 'Position', label: 'Center Y' },
    { name: 'colorA', type: 'color', default: '#667eea', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#764ba2', group: 'Colors', label: 'Color B' }
  ]
}
