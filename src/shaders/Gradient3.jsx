import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uAngle;
  uniform float uBlend;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  #define PI 3.14159265359

  void main() {
    vec2 uv = vUv;

    // Rotate gradient direction
    float angle = uAngle + uTime * uSpeed * 0.1;
    float s = sin(angle);
    float c = cos(angle);
    vec2 rotatedUv = vec2(
      c * (uv.x - 0.5) - s * (uv.y - 0.5) + 0.5,
      s * (uv.x - 0.5) + c * (uv.y - 0.5) + 0.5
    );

    float t = rotatedUv.x;

    // Animate the gradient position
    t += sin(uTime * uSpeed) * 0.1;

    // Three-color gradient with smooth blending
    vec3 color;
    float blend = uBlend;

    if (t < 0.5) {
      float localT = t * 2.0;
      localT = smoothstep(0.0, 1.0, localT);
      color = mix(uColorA, uColorB, localT);
    } else {
      float localT = (t - 0.5) * 2.0;
      localT = smoothstep(0.0, 1.0, localT);
      color = mix(uColorB, uColorC, localT);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Gradient3 - Three-color animated gradient
 */
export default function Gradient3({
  speed = 0.5,
  angle = 0.785,
  blend = 0.5,
  colorA = '#667eea',
  colorB = '#764ba2',
  colorC = '#f093fb'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uAngle: { value: angle },
    uBlend: { value: blend },
    uColorA: { value: new THREE.Color(colorA) },
    uColorB: { value: new THREE.Color(colorB) },
    uColorC: { value: new THREE.Color(colorC) }
  }), [speed, angle, blend, colorA, colorB, colorC])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Gradient3.shaderMeta = {
  name: 'Gradient3',
  category: 'Gradients',
  description: 'Animated three-color gradient',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 0.5, min: 0, max: 2, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'angle', type: 'range', default: 0.785, min: 0, max: 6.28, step: 0.1, group: 'Effect', label: 'Angle' },
    { name: 'blend', type: 'range', default: 0.5, min: 0, max: 1, step: 0.05, group: 'Effect', label: 'Blend' },
    { name: 'colorA', type: 'color', default: '#667eea', group: 'Colors', label: 'Color A' },
    { name: 'colorB', type: 'color', default: '#764ba2', group: 'Colors', label: 'Color B' },
    { name: 'colorC', type: 'color', default: '#f093fb', group: 'Colors', label: 'Color C' }
  ]
}
