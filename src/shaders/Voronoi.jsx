import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uEdgeWidth;
  uniform vec3 uCellColor;
  uniform vec3 uEdgeColor;
  uniform vec2 uResolution;

  // Hash function for pseudo-random values
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;
    uv *= uScale;

    // Cell coordinates
    vec2 cellId = floor(uv);
    vec2 cellUv = fract(uv);

    float minDist = 1.0;
    float secondMinDist = 1.0;
    vec2 closestPoint;

    // Check neighboring cells
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = hash2(cellId + neighbor);

        // Animate points
        point = 0.5 + 0.5 * sin(uTime * uSpeed + 6.2831 * point);

        vec2 diff = neighbor + point - cellUv;
        float dist = length(diff);

        if (dist < minDist) {
          secondMinDist = minDist;
          minDist = dist;
          closestPoint = point;
        } else if (dist < secondMinDist) {
          secondMinDist = dist;
        }
      }
    }

    // Edge detection
    float edge = secondMinDist - minDist;
    float edgeLine = 1.0 - smoothstep(0.0, uEdgeWidth, edge);

    // Color based on cell
    vec3 cellVariation = vec3(hash2(cellId + closestPoint).x);
    vec3 color = mix(uCellColor * (0.7 + 0.3 * cellVariation), uEdgeColor, edgeLine);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Voronoi - Animated cellular/voronoi pattern
 */
export default function Voronoi({
  speed = 0.5,
  scale = 5,
  edgeWidth = 0.05,
  cellColor = '#1a1a2e',
  edgeColor = '#667eea'
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uScale: { value: scale },
    uEdgeWidth: { value: edgeWidth },
    uCellColor: { value: new THREE.Color(cellColor) },
    uEdgeColor: { value: new THREE.Color(edgeColor) }
  }), [speed, scale, edgeWidth, cellColor, edgeColor])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

Voronoi.shaderMeta = {
  name: 'Voronoi',
  category: 'Textures',
  description: 'Animated cellular voronoi pattern',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 0.5, min: 0, max: 2, step: 0.1, group: 'Animation', label: 'Speed' },
    { name: 'scale', type: 'range', default: 5, min: 2, max: 15, step: 1, group: 'Effect', label: 'Scale' },
    { name: 'edgeWidth', type: 'range', default: 0.05, min: 0.01, max: 0.2, step: 0.01, group: 'Effect', label: 'Edge Width' },
    { name: 'cellColor', type: 'color', default: '#1a1a2e', group: 'Colors', label: 'Cell Color' },
    { name: 'edgeColor', type: 'color', default: '#667eea', group: 'Colors', label: 'Edge Color' }
  ]
}
