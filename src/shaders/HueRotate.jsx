import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uHueOffset;
  uniform float uSaturation;
  uniform float uBrightness;

  // Convert HSV to RGB
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 uv = vUv;

    // Create base hue from position and time
    float hue = uv.x + uv.y * 0.5;
    hue += uTime * uSpeed;
    hue += uHueOffset;
    hue = fract(hue);

    // Create color in HSV then convert to RGB
    vec3 hsv = vec3(hue, uSaturation, uBrightness);
    vec3 color = hsv2rgb(hsv);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * HueRotate - Animated hue rotation gradient
 */
export default function HueRotate({
  speed = 0.2,
  hueOffset = 0,
  saturation = 0.8,
  brightness = 0.9
}) {
  const uniforms = useMemo(() => ({
    uSpeed: { value: speed },
    uHueOffset: { value: hueOffset },
    uSaturation: { value: saturation },
    uBrightness: { value: brightness }
  }), [speed, hueOffset, saturation, brightness])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

HueRotate.shaderMeta = {
  name: 'HueRotate',
  category: 'Adjustments',
  description: 'Animated rainbow hue rotation effect',
  requiresChild: false,
  props: [
    { name: 'speed', type: 'range', default: 0.2, min: 0, max: 1, step: 0.01, group: 'Animation', label: 'Speed' },
    { name: 'hueOffset', type: 'range', default: 0, min: 0, max: 1, step: 0.01, group: 'Effect', label: 'Hue Offset' },
    { name: 'saturation', type: 'range', default: 0.8, min: 0, max: 1, step: 0.01, group: 'Effect', label: 'Saturation' },
    { name: 'brightness', type: 'range', default: 0.9, min: 0, max: 1, step: 0.01, group: 'Effect', label: 'Brightness' }
  ]
}
