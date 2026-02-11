import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

// GLSL Fragment Shader for Simplex Noise
// Based on Ashima Arts simplex noise implementation
const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uScale;
  uniform float uSpeed;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uContrast;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
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
    vec2 uv = vUv * uScale;

    // Animate noise
    float time = uTime * uSpeed;

    // Layer multiple octaves
    float n = 0.0;
    n += 0.5 * snoise(uv + time * 0.1);
    n += 0.25 * snoise(uv * 2.0 - time * 0.15);
    n += 0.125 * snoise(uv * 4.0 + time * 0.2);

    // Normalize and apply contrast
    n = n * 0.5 + 0.5;
    n = pow(n, uContrast);

    // Mix colors
    vec3 color = mix(uColorA, uColorB, n);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * SimplexNoise - Animated simplex noise texture
 */
export default function SimplexNoise({
  scale = 3,
  speed = 0.5,
  colorA = '#1a1a2e',
  colorB = '#eee2dc',
  contrast = 1
}) {
  const uniforms = useMemo(() => ({
    uScale: { value: scale },
    uSpeed: { value: speed },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uContrast: { value: contrast }
  }), [scale, speed, colorA, colorB, contrast])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

SimplexNoise.shaderMeta = {
  name: 'SimplexNoise',
  category: 'Textures',
  description: 'Animated simplex noise with multiple octaves',
  requiresChild: false,
  props: [
    { name: 'scale', type: 'range', default: 3, min: 0.5, max: 10, step: 0.1, group: 'Effect', label: 'Scale' },
    { name: 'speed', type: 'range', default: 0.5, min: 0, max: 2, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'colorA', type: 'color', default: '#1a1a2e', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#eee2dc', group: 'Colors', label: 'Color B' },
    { name: 'contrast', type: 'range', default: 1, min: 0.5, max: 3, step: 0.1, group: 'Effect', label: 'Contrast' }
  ]
}
