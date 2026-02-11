import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uContrast;
  uniform float uBrightness;
  uniform float uNoiseAmount;
  uniform vec3 uShadowColor;
  uniform vec3 uHighlightColor;
  uniform vec2 uResolution;

  // Simplex noise for texture
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Create animated noise texture
    float noise = snoise(uv * 3.0 + uTime * 0.2);
    noise += snoise(uv * 6.0 - uTime * 0.3) * 0.5;
    noise += snoise(uv * 12.0 + uTime * 0.1) * 0.25;
    noise = noise / 1.75;

    // Add some additional texture
    float texture = snoise(uv * 20.0 + uTime * 0.5) * uNoiseAmount;
    noise += texture;

    // Normalize to 0-1
    float luminance = noise * 0.5 + 0.5;

    // Apply contrast and brightness
    luminance = (luminance - 0.5) * uContrast + 0.5 + uBrightness;
    luminance = clamp(luminance, 0.0, 1.0);

    // Map to duotone colors
    vec3 color = mix(uShadowColor, uHighlightColor, luminance);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Duotone - Two-color gradient mapping effect
 */
export default function Duotone({
  contrast = 1.2,
  brightness = 0,
  noiseAmount = 0.1,
  shadowColor = '#1a1a2e',
  highlightColor = '#eef2ff'
}) {
  const uniforms = useMemo(() => ({
    uContrast: { value: contrast },
    uBrightness: { value: brightness },
    uNoiseAmount: { value: noiseAmount },
    uShadowColor: { value: new THREE.Color(shadowColor) },
    uHighlightColor: { value: new THREE.Color(highlightColor) }
  }), [contrast, brightness, noiseAmount, shadowColor, highlightColor])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Duotone.shaderMeta = {
  name: 'Duotone',
  category: 'Adjustments',
  description: 'Two-color gradient mapping effect',
  requiresChild: false,
  props: [
    { name: 'contrast', type: 'range', default: 1.2, min: 0.5, max: 2, step: 0.1, group: 'Effect', label: 'Contrast' },
    { name: 'brightness', type: 'range', default: 0, min: -0.5, max: 0.5, step: 0.05, group: 'Effect', label: 'Brightness' },
    { name: 'noiseAmount', type: 'range', default: 0.1, min: 0, max: 0.5, step: 0.05, group: 'Effect', label: 'Noise' },
    { name: 'shadowColor', type: 'color', default: '#1a1a2e', group: 'Colors', label: 'Shadow Color' },
    { name: 'highlightColor', type: 'color', default: '#eef2ff', group: 'Colors', label: 'Highlight Color' }
  ]
}
