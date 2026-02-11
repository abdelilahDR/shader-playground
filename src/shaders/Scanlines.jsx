import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uOpacity;
  uniform float uFlicker;
  uniform vec3 uLineColor;
  uniform vec3 uBackgroundColor;
  uniform vec2 uResolution;

  // Random function
  float random(float x) {
    return fract(sin(x * 12.9898) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;

    // Create scanlines
    float scanline = sin(uv.y * uDensity * uResolution.y * 0.5 + uTime * uSpeed) * 0.5 + 0.5;
    scanline = pow(scanline, 2.0);

    // Add flicker
    float flicker = 1.0 - uFlicker * 0.1 * random(uTime * 10.0);

    // Add slight horizontal distortion
    float distort = sin(uv.y * 100.0 + uTime * 5.0) * 0.001;
    uv.x += distort;

    // Create color gradient background
    vec3 bgGradient = uBackgroundColor * (0.8 + 0.2 * uv.y);

    // Mix scanline
    float line = mix(1.0, scanline, uOpacity);
    vec3 color = mix(bgGradient, uLineColor, (1.0 - line) * 0.3);
    color *= line * flicker;

    // Add slight vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.5;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Scanlines - CRT monitor scanline effect
 */
export default function Scanlines({
  speed = 2,
  density = 1,
  opacity = 0.5,
  flicker = 0.3,
  lineColor = '#00ff00',
  backgroundColor = '#001100'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uDensity: { value: density },
    uOpacity: { value: opacity },
    uFlicker: { value: flicker },
    uLineColor: { value: new THREE.Color(lineColor) },
    uBackgroundColor: { value: new THREE.Color(backgroundColor) }
  }), [speed, density, opacity, flicker, lineColor, backgroundColor])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Scanlines.shaderMeta = {
  name: 'Scanlines',
  category: 'Stylize',
  description: 'Retro CRT monitor scanline effect',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 2, min: 0, max: 10, step: 0.5, group: 'Animation', label: 'Speed' },
    { name: 'density', type: 'range', default: 1, min: 0.5, max: 3, step: 0.1, group: 'Effect', label: 'Density' },
    { name: 'opacity', type: 'range', default: 0.5, min: 0, max: 1, step: 0.05, group: 'Effect', label: 'Opacity' },
    { name: 'flicker', type: 'range', default: 0.3, min: 0, max: 1, step: 0.1, group: 'Effect', label: 'Flicker' },
    { name: 'lineColor', type: 'color', default: '#00ff00', group: 'Colors', label: 'Line Color' },
    { name: 'backgroundColor', type: 'color', default: '#001100', group: 'Colors', label: 'Background' }
  ]
}
