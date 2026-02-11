import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uDotSize;
  uniform float uSpacing;
  uniform float uAngle;
  uniform vec3 uDotColor;
  uniform vec3 uBackgroundColor;
  uniform vec2 uResolution;

  #define PI 3.14159265359

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Rotate UV
    float s = sin(uAngle);
    float c = cos(uAngle);
    vec2 center = vec2(0.5 * aspect, 0.5);
    uv -= center;
    uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
    uv += center;

    // Create grid
    vec2 gridUv = uv * uSpacing;
    vec2 cellId = floor(gridUv);
    vec2 cellUv = fract(gridUv) - 0.5;

    // Create animated gradient for dot size variation
    float gradient = sin(cellId.x * 0.3 + uTime) * cos(cellId.y * 0.3 + uTime * 0.7);
    gradient = gradient * 0.5 + 0.5;

    // Calculate dot
    float dist = length(cellUv);
    float dotRadius = uDotSize * (0.3 + 0.7 * gradient);
    float dot = 1.0 - smoothstep(dotRadius - 0.02, dotRadius + 0.02, dist);

    vec3 color = mix(uBackgroundColor, uDotColor, dot);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Halftone - Classic halftone dot pattern
 */
export default function Halftone({
  dotSize = 0.3,
  spacing = 20,
  angle = 0.785,
  dotColor = '#000000',
  backgroundColor = '#ffffff'
}) {
  const uniforms = useMemo(() => ({
    uDotSize: { value: dotSize },
    uSpacing: { value: spacing },
    uAngle: { value: angle },
    uDotColor: { value: new THREE.Color(dotColor) },
    uBackgroundColor: { value: new THREE.Color(backgroundColor) }
  }), [dotSize, spacing, angle, dotColor, backgroundColor])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Halftone.shaderMeta = {
  name: 'Halftone',
  category: 'Stylize',
  description: 'Classic halftone dot pattern effect',
  requiresChild: false,
  props: [
    { name: 'dotSize', type: 'range', default: 0.3, min: 0.1, max: 0.5, step: 0.01, group: 'Effect', label: 'Dot Size' },
    { name: 'spacing', type: 'range', default: 20, min: 5, max: 50, step: 1, group: 'Effect', label: 'Spacing' },
    { name: 'angle', type: 'range', default: 0.785, min: 0, max: 1.57, step: 0.01, group: 'Effect', label: 'Angle' },
    { name: 'dotColor', type: 'color', default: '#000000', group: 'Colors', label: 'Dot Color' },
    { name: 'backgroundColor', type: 'color', default: '#ffffff', group: 'Colors', label: 'Background' }
  ]
}
