import React, { useState, useMemo, useCallback } from 'react'
import * as ShaderComponents from 'shaders/react'
import PropControl from './PropControl'
import ShaderErrorBoundary from './ShaderErrorBoundary'

const { Shader, Checkerboard } = ShaderComponents

export default function ShaderDetail({ shader, onBack }) {
  // Initialize props with defaults
  const [props, setProps] = useState(() => {
    const initial = {}
    shader.props.forEach(p => {
      initial[p.name] = p.default
    })
    return initial
  })

  const [copied, setCopied] = useState(false)
  const [panelCollapsed, setPanelCollapsed] = useState(false)

  const Component = ShaderComponents[shader.name]

  const updateProp = useCallback((name, value) => {
    setProps(prev => ({ ...prev, [name]: value }))
  }, [])

  const resetProps = useCallback(() => {
    const initial = {}
    shader.props.forEach(p => {
      initial[p.name] = p.default
    })
    setProps(initial)
  }, [shader])

  // Group props
  const groupedProps = useMemo(() => {
    const groups = {}
    shader.props.forEach(p => {
      const g = p.group || 'General'
      if (!groups[g]) groups[g] = []
      groups[g].push(p)
    })
    return groups
  }, [shader])

  // Generate code
  const code = useMemo(() => {
    const propsStr = shader.props
      .filter(p => JSON.stringify(props[p.name]) !== JSON.stringify(p.default))
      .map(p => {
        const val = props[p.name]
        if (typeof val === 'string') return `  ${p.name}="${val}"`
        if (typeof val === 'boolean') return val ? `  ${p.name}` : `  ${p.name}={false}`
        if (typeof val === 'object') return `  ${p.name}={${JSON.stringify(val)}}`
        return `  ${p.name}={${val}}`
      })
      .join('\n')

    const childNote = shader.requiresChild ? '  {/* Requires child content */}\n  ' : ''
    
    return `<Shader>\n  <${shader.name}${propsStr ? '\n' + propsStr + '\n  ' : ' '}${shader.requiresChild ? '>\n    {children}\n  </' + shader.name + '>' : '/>'}\n</Shader>`
  }, [shader, props])

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#0a0a0b] border-b border-[#2a2a2e] z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#71717a] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="w-px h-5 bg-[#2a2a2e]" />
          <h1 className="font-semibold">{shader.name}</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#1c1c20] text-[#71717a]">{shader.category}</span>
          {shader.requiresChild && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
              Requires child
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={resetProps} className="px-3 py-1.5 text-xs text-[#71717a] hover:text-white bg-[#141416] border border-[#2a2a2e] rounded-lg transition-colors">
            Reset
          </button>
          <button
            onClick={() => setPanelCollapsed(!panelCollapsed)}
            className="px-3 py-1.5 text-xs text-[#71717a] hover:text-white bg-[#141416] border border-[#2a2a2e] rounded-lg transition-colors"
          >
            {panelCollapsed ? 'Show Panel' : 'Hide Panel'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Shader preview */}
        <div className="flex-1 relative bg-black">
          {Component && !shader.requiresChild ? (
            <ShaderErrorBoundary shaderName={shader.name} fallback={<ShaderError name={shader.name} />}>
              <Shader style={{ width: '100%', height: '100%' }}>
                <Component {...props} />
              </Shader>
            </ShaderErrorBoundary>
          ) : shader.requiresChild ? (
            <ShaderErrorBoundary shaderName={shader.name} fallback={<ShaderError name={shader.name} />}>
              <Shader style={{ width: '100%', height: '100%' }}>
                <Component {...props}>
                  {/* Use Checkerboard shader as child for filter shaders - more visible transforms */}
                  <Checkerboard
                    colorA="#667eea"
                    colorB="#3b2f63"
                    cells={8}
                  />
                </Component>
              </Shader>
            </ShaderErrorBoundary>
          ) : (
            <div className="flex items-center justify-center h-full text-[#71717a]">
              Component not available
            </div>
          )}
        </div>

        {/* Control panel */}
        {!panelCollapsed && (
          <aside className="w-80 bg-[#0a0a0b] border-l border-[#2a2a2e] flex flex-col overflow-hidden">
            {/* Props */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <p className="text-xs text-[#71717a] leading-relaxed">{shader.description}</p>
              
              {Object.entries(groupedProps).map(([group, groupProps]) => (
                <div key={group}>
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a] mb-3">{group}</h3>
                  <div className="space-y-3">
                    {groupProps.map(prop => (
                      <PropControl
                        key={prop.name}
                        prop={prop}
                        value={props[prop.name]}
                        onChange={val => updateProp(prop.name, val)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Code output */}
            <div className="border-t border-[#2a2a2e] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#71717a]">Code</span>
                <button onClick={copyCode} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[#a1a1aa] bg-[#141416] rounded-lg p-3 overflow-x-auto max-h-40 overflow-y-auto leading-relaxed">
                {code}
              </pre>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

function ShaderError({ name }) {
  return (
    <div className="flex items-center justify-center h-full text-[#71717a] flex-col gap-2">
      <span className="text-4xl">⚠️</span>
      <p className="text-sm">Failed to render {name}</p>
      <p className="text-xs">This shader may require WebGPU support</p>
    </div>
  )
}

