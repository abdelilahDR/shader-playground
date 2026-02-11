import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uGridSize;
  uniform float uLineWidth;
  uniform vec3 uLineColor;
  uniform vec3 uBackgroundColor;
  uniform float uAnimated;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = vUv;

    // Correct for aspect ratio
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Add animation offset
    if (uAnimated > 0.5) {
      uv += vec2(uTime * 0.1, uTime * 0.05);
    }

    // Create grid
    vec2 grid = fract(uv * uGridSize);

    // Calculate line thickness
    float lineX = step(grid.x, uLineWidth) + step(1.0 - uLineWidth, grid.x);
    float lineY = step(grid.y, uLineWidth) + step(1.0 - uLineWidth, grid.y);
    float line = max(lineX, lineY);

    // Mix colors
    vec3 color = mix(uBackgroundColor, uLineColor, line);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Grid - Customizable grid pattern
 */
export default function Grid({
  gridSize = 10,
  lineWidth = 0.02,
  lineColor = '#ffffff',
  backgroundColor = '#0a0a0b',
  animated = false
}) {
  const uniforms = useMemo(() => ({
    uGridSize: { value: gridSize },
    uLineWidth: { value: lineWidth },
    uLineColor: { value: new THREE.Color(lineColor) },
    uBackgroundColor: { value: new THREE.Color(backgroundColor) },
    uAnimated: { value: animated ? 1.0 : 0.0 }
  }), [gridSize, lineWidth, lineColor, backgroundColor, animated])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Grid.shaderMeta = {
  name: 'Grid',
  category: 'Patterns',
  description: 'Customizable grid pattern with optional animation',
  requiresChild: false,
  props: [
    { name: 'gridSize', type: 'range', default: 10, min: 2, max: 50, step: 1, group: 'Effect', label: 'Grid Size' },
    { name: 'lineWidth', type: 'range', default: 0.02, min: 0.005, max: 0.1, step: 0.005, group: 'Effect', label: 'Line Width' },
    { name: 'lineColor', type: 'color', default: '#ffffff', group: 'Colors', label: 'Line Color' },
    { name: 'backgroundColor', type: 'color', default: '#0a0a0b', group: 'Colors', label: 'Background' },
    { name: 'animated', type: 'range', default: 0, min: 0, max: 1, step: 1, group: 'Animation', label: 'Animated (0=Off, 1=On)' }
  ]
}
