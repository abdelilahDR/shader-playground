import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uSegments;
  uniform float uZoom;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec2 uResolution;

  #define PI 3.14159265359

  void main() {
    vec2 uv = vUv - 0.5;

    // Correct for aspect ratio
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Convert to polar coordinates
    float angle = atan(uv.y, uv.x);
    float radius = length(uv) * uZoom;

    // Create kaleidoscope effect
    float segmentAngle = PI * 2.0 / uSegments;
    angle = mod(angle, segmentAngle);

    // Mirror alternate segments
    if (mod(floor(atan(uv.y, uv.x) / segmentAngle), 2.0) == 1.0) {
      angle = segmentAngle - angle;
    }

    // Add rotation animation
    angle += uTime * uSpeed;

    // Convert back to cartesian
    vec2 kaleidoUv;
    kaleidoUv.x = cos(angle) * radius;
    kaleidoUv.y = sin(angle) * radius;

    // Create pattern
    float pattern1 = sin(kaleidoUv.x * 20.0 + uTime) * cos(kaleidoUv.y * 20.0);
    float pattern2 = sin(length(kaleidoUv) * 30.0 - uTime * 2.0);
    float pattern = (pattern1 + pattern2) * 0.5;

    // Create color
    vec3 color;
    if (pattern < -0.3) {
      color = uColorA;
    } else if (pattern < 0.3) {
      color = uColorB;
    } else {
      color = uColorC;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Kaleidoscope - Mirrored kaleidoscope pattern
 */
export default function Kaleidoscope({
  speed = 0.3,
  segments = 6,
  zoom = 2,
  colorA = '#ff006e',
  colorB = '#8338ec',
  colorC = '#3a86ff'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uSegments: { value: segments },
    uZoom: { value: zoom },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uColorC: { value: new THREE.Color(colorC) }
  }), [speed, segments, zoom, colorA, colorB, colorC])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Kaleidoscope.shaderMeta = {
  name: 'Kaleidoscope',
  category: 'Distortions',
  description: 'Animated kaleidoscope mirror effect',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 0.3, min: 0, max: 2, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'segments', type: 'range', default: 6, min: 2, max: 12, step: 1, group: 'Effect', label: 'Segments' },
    { name: 'zoom', type: 'range', default: 2, min: 0.5, max: 5, step: 0.1, group: 'Effect', label: 'Zoom' },
    { name: 'colorA', type: 'color', default: '#ff006e', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#8338ec', group: 'Colors', label: 'Color B' },
    { name: 'colorC', type: 'color', default: '#3a86ff', group: 'Colors', label: 'Color C' }
  ]
}
