import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uComplexity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  void main() {
    vec2 uv = vUv * uScale;
    float t = uTime * uSpeed;

    // Create plasma effect with multiple sine waves
    float v1 = sin(uv.x * uComplexity + t);
    float v2 = sin(uComplexity * (uv.x * sin(t * 0.5) + uv.y * cos(t * 0.3)) + t);
    float v3 = sin(sqrt(pow(uv.x - 0.5, 2.0) + pow(uv.y - 0.5, 2.0)) * uComplexity * 2.0 + t);
    float v4 = sin(sqrt(pow(uv.x, 2.0) + pow(uv.y, 2.0)) * uComplexity + t);

    float v = (v1 + v2 + v3 + v4) * 0.25;

    // Create color from plasma value
    float c1 = sin(v * 3.14159);
    float c2 = cos(v * 3.14159);

    vec3 color = uColorA * c1 * c1 + uColorB * c2 * c2 + uColorC * (1.0 - c1 * c1 - c2 * c2) * 0.5;
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Plasma - Classic animated plasma effect
 */
export default function Plasma({
  speed = 1,
  scale = 2,
  complexity = 4,
  colorA = '#ff0080',
  colorB = '#00ffff',
  colorC = '#8000ff'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uScale: { value: scale },
    uComplexity: { value: complexity },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uColorC: { value: new THREE.Color(colorC) }
  }), [speed, scale, complexity, colorA, colorB, colorC])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Plasma.shaderMeta = {
  name: 'Plasma',
  category: 'Textures',
  description: 'Classic animated plasma effect with swirling colors',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 1, min: 0, max: 3, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'scale', type: 'range', default: 2, min: 0.5, max: 5, step: 0.1, group: 'Effect', label: 'Scale' },
    { name: 'complexity', type: 'range', default: 4, min: 1, max: 10, step: 0.5, group: 'Effect', label: 'Complexity' },
    { name: 'colorA', type: 'color', default: '#ff0080', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#00ffff', group: 'Colors', label: 'Color B' },
    { name: 'colorC', type: 'color', default: '#8000ff', group: 'Colors', label: 'Color C' }
  ]
}
