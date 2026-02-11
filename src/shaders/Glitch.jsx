import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uSpeed;
  uniform float uBlockSize;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec2 uResolution;

  // Random functions
  float random(float x) {
    return fract(sin(x * 12.9898) * 43758.5453);
  }

  float random2(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float t = floor(uTime * uSpeed * 10.0);

    // Create glitch blocks
    float blockY = floor(uv.y * uBlockSize);
    float glitchLine = step(0.98 - uIntensity * 0.3, random(blockY + t));

    // Horizontal shift for glitch lines
    float shift = (random(blockY + t * 2.0) - 0.5) * uIntensity * 0.3;
    uv.x += shift * glitchLine;

    // Color channel separation
    float rShift = uIntensity * 0.02 * sin(uTime * 20.0);
    float bShift = -uIntensity * 0.02 * cos(uTime * 20.0);

    // Create base pattern
    vec2 blockUv = floor(uv * 20.0) / 20.0;
    float pattern = random2(blockUv + floor(uTime * 2.0));

    // Add scanline noise
    float scanNoise = random(uv.y * 500.0 + uTime * 100.0);
    scanNoise = smoothstep(0.3, 0.7, scanNoise);

    // RGB channels with offset
    float r = step(0.5, random2(blockUv + vec2(rShift, 0.0) + floor(uTime * 3.0)));
    float g = step(0.5, random2(blockUv + floor(uTime * 3.0)));
    float b = step(0.5, random2(blockUv + vec2(bShift, 0.0) + floor(uTime * 3.0)));

    // Mix colors
    vec3 color = uColorA * r + uColorB * g + uColorC * b;
    color = mix(color, vec3(scanNoise), 0.1 * uIntensity);

    // Add occasional white flash
    float flash = step(0.995, random(t)) * step(0.5, random(uv.y + t));
    color += vec3(flash * 0.5);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Glitch - Digital glitch distortion effect
 */
export default function Glitch({
  intensity = 0.5,
  speed = 1,
  blockSize = 10,
  colorA = '#ff0000',
  colorB = '#00ff00',
  colorC = '#0000ff'
}) {
  const uniforms = useMemo(() => ({
    uIntensity: { value: intensity },
    uSpeed: { value: speed },
    uBlockSize: { value: blockSize },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uColorC: { value: new THREE.Color(colorC) }
  }), [intensity, speed, blockSize, colorA, colorB, colorC])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Glitch.shaderMeta = {
  name: 'Glitch',
  category: 'Stylize',
  description: 'Digital glitch and distortion effect',
  requiresChild: false,
  props: [
    { name: 'intensity', type: 'range', default: 0.5, min: 0, max: 1, step: 0.05, group: 'Effect', label: 'Intensity' },
    { name: 'speed', type: 'range', default: 1, min: 0.1, max: 3, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'blockSize', type: 'range', default: 10, min: 5, max: 30, step: 1, group: 'Effect', label: 'Block Size' },
    { name: 'colorA', type: 'color', default: '#ff0000', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#00ff00', group: 'Colors', label: 'Color B' },
    { name: 'colorC', type: 'color', default: '#0000ff', group: 'Colors', label: 'Color C' }
  ]
}
