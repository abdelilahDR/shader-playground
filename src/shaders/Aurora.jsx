import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform float uWaveCount;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec2 uResolution;

  // Simplex noise
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
    float t = uTime * uSpeed;

    // Create aurora waves
    float aurora = 0.0;
    for (float i = 0.0; i < 5.0; i++) {
      float freq = 1.0 + i * 0.5;
      float amp = 1.0 / (i + 1.0);
      float wave = snoise(vec2(uv.x * freq * uWaveCount + t * (0.5 + i * 0.1), i * 10.0));
      wave = wave * 0.5 + 0.5;

      // Create vertical curtain effect
      float curtain = smoothstep(0.3, 0.7, uv.y + wave * 0.3);
      curtain *= smoothstep(1.0, 0.5, uv.y);

      aurora += curtain * amp * wave;
    }

    aurora *= uIntensity;
    aurora = clamp(aurora, 0.0, 1.0);

    // Color mixing based on position and intensity
    float colorMix = snoise(vec2(uv.x * 2.0 + t * 0.2, uv.y + t * 0.1));
    colorMix = colorMix * 0.5 + 0.5;

    vec3 auroraColor;
    if (colorMix < 0.33) {
      auroraColor = mix(uColorA, uColorB, colorMix * 3.0);
    } else if (colorMix < 0.66) {
      auroraColor = mix(uColorB, uColorC, (colorMix - 0.33) * 3.0);
    } else {
      auroraColor = mix(uColorC, uColorA, (colorMix - 0.66) * 3.0);
    }

    // Dark background with aurora glow
    vec3 bgColor = vec3(0.02, 0.02, 0.05);
    vec3 color = mix(bgColor, auroraColor, aurora);

    // Add some stars
    float stars = step(0.998, snoise(uv * 200.0));
    color += vec3(stars * 0.5);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Aurora - Northern lights effect
 */
export default function Aurora({
  speed = 0.3,
  intensity = 1,
  waveCount = 2,
  colorA = '#00ff87',
  colorB = '#60efff',
  colorC = '#ff00ff'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uIntensity: { value: intensity },
    uWaveCount: { value: waveCount },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uColorC: { value: new THREE.Color(colorC) }
  }), [speed, intensity, waveCount, colorA, colorB, colorC])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Aurora.shaderMeta = {
  name: 'Aurora',
  category: 'Textures',
  description: 'Animated northern lights effect',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 0.3, min: 0, max: 1, step: 0.05, group: 'Animation', label: 'Speed' },
    { name: 'intensity', type: 'range', default: 1, min: 0.5, max: 2, step: 0.1, group: 'Effect', label: 'Intensity' },
    { name: 'waveCount', type: 'range', default: 2, min: 1, max: 5, step: 0.5, group: 'Effect', label: 'Wave Count' },
    { name: 'colorA', type: 'color', default: '#00ff87', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#60efff', group: 'Colors', label: 'Color B' },
    { name: 'colorC', type: 'color', default: '#ff00ff', group: 'Colors', label: 'Color C' }
  ]
}
