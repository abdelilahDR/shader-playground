import { useMemo } from 'react'
import * as THREE from 'three'
import ShaderCanvas, { ShaderMesh } from '../lib/ShaderCanvas'

const fragmentShader = `
  precision highp float;

  uniform vec3 uColor;

  void main() {
    gl_FragColor = vec4(uColor, 1.0);
  }
`

/**
 * SolidColor - Simple solid color fill
 */
export default function SolidColor({ color = '#667eea' }) {
  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(color) }
  }), [color])

  return (
    <ShaderCanvas>
      <ShaderMesh fragmentShader={fragmentShader} uniforms={uniforms} />
    </ShaderCanvas>
  )
}

SolidColor.shaderMeta = {
  name: 'SolidColor',
  category: 'Basics',
  description: 'Simple solid color fill',
  requiresChild: false,
  props: [
    { name: 'color', type: 'color', default: '#667eea', group: 'Colors', label: 'Color' }
  ]
}
