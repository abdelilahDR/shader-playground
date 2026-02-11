import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec3 uColorCenter;
  uniform vec3 uColorEdge;
  uniform float uIntensity;
  uniform float uSoftness;
  uniform float uRoundness;
  uniform vec2 uResolution;

  void main() {
    // Center the UV coordinates
    vec2 uv = vUv - 0.5;

    // Correct for aspect ratio
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Calculate distance from center with roundness control
    float dist;
    if (uRoundness > 0.99) {
      // Circular vignette
      dist = length(uv);
    } else {
      // Rounded rectangle vignette
      vec2 absUv = abs(uv);
      float maxDist = max(absUv.x, absUv.y);
      float minDist = length(uv);
      dist = mix(maxDist, minDist, uRoundness);
    }

    // Create vignette falloff
    float vignette = smoothstep(uIntensity - uSoftness, uIntensity + uSoftness, dist);

    // Mix colors
    vec3 color = mix(uColorCenter, uColorEdge, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Vignette - Classic vignette darkening effect
 */
export default function Vignette({
  colorCenter = '#ffffff',
  colorEdge = '#000000',
  intensity = 0.5,
  softness = 0.3,
  roundness = 1
}) {
  const uniforms = useMemo(() => ({
    uColorCenter: { value: new THREE.Color(colorCenter) },
    uColorEdge: { value: new THREE.Color(colorEdge) },
    uIntensity: { value: intensity },
    uSoftness: { value: softness },
    uRoundness: { value: roundness }
  }), [colorCenter, colorEdge, intensity, softness, roundness])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Vignette.shaderMeta = {
  name: 'Vignette',
  category: 'Adjustments',
  description: 'Classic vignette effect with customizable falloff',
  requiresChild: false,
  props: [
    { name: 'colorCenter', type: 'color', default: '#ffffff', group: 'Colors', label: 'Center Color' },
    { name: 'colorEdge', type: 'color', default: '#000000', group: 'Colors', label: 'Edge Color' },
    { name: 'intensity', type: 'range', default: 0.5, min: 0.1, max: 1, step: 0.01, group: 'Effect', label: 'Intensity' },
    { name: 'softness', type: 'range', default: 0.3, min: 0, max: 0.5, step: 0.01, group: 'Effect', label: 'Softness' },
    { name: 'roundness', type: 'range', default: 1, min: 0, max: 1, step: 0.01, group: 'Effect', label: 'Roundness' }
  ]
}
