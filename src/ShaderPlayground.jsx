/**
 * Shader Playground - Interactive GLSL Shader Editor
 *
 * Layout: Left sidebar (shader list) | Center (preview) | Right sidebar (controls)
 */

import { useState, useMemo, useRef, useCallback } from 'react'
import {
  LinearGradient,
  RadialGradient,
  Gradient3,
  Checkerboard,
  Grid,
  SimplexNoise,
  Plasma,
  Voronoi,
  Aurora,
  SolidColor,
  Waves,
  Ripple,
  Swirl,
  Kaleidoscope,
  Pixelate,
  Halftone,
  Scanlines,
  Glitch,
  Vignette,
  HueRotate,
  Duotone,
  customShaders
} from './shaders'

const shaderComponents = {
  LinearGradient,
  RadialGradient,
  Gradient3,
  Checkerboard,
  Grid,
  SimplexNoise,
  Plasma,
  Voronoi,
  Aurora,
  SolidColor,
  Waves,
  Ripple,
  Swirl,
  Kaleidoscope,
  Pixelate,
  Halftone,
  Scanlines,
  Glitch,
  Vignette,
  HueRotate,
  Duotone
}

// Canvas size presets
const canvasSizes = [
  { name: 'Auto', width: null, height: null },
  { name: 'HD', width: 1920, height: 1080 },
  { name: '4K', width: 3840, height: 2160 },
  { name: 'Square', width: 1080, height: 1080 },
  { name: 'Portrait', width: 1080, height: 1920 },
  { name: 'Custom', width: 'custom', height: 'custom' }
]

// Group shaders by category
const groupByCategory = (shaders) => {
  const order = ['Gradients', 'Patterns', 'Textures', 'Basics', 'Distortions', 'Stylize', 'Adjustments']
  const grouped = shaders.reduce((acc, shader) => {
    const category = shader.category || 'Other'
    if (!acc[category]) acc[category] = []
    acc[category].push(shader)
    return acc
  }, {})

  const sorted = {}
  order.forEach(cat => {
    if (grouped[cat]) sorted[cat] = grouped[cat]
  })
  Object.keys(grouped).forEach(cat => {
    if (!sorted[cat]) sorted[cat] = grouped[cat]
  })
  return sorted
}

export default function ShaderPlayground() {
  const [activeShader, setActiveShader] = useState('Plasma')
  const [props, setProps] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [collapsedCategories, setCollapsedCategories] = useState({})
  const [canvasSize, setCanvasSize] = useState('Auto')
  const [customWidth, setCustomWidth] = useState(1920)
  const [customHeight, setCustomHeight] = useState(1080)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const previewRef = useRef(null)

  const shaderMeta = customShaders.find(s => s.name === activeShader)
  const ShaderComponent = shaderComponents[activeShader]

  // Get current canvas dimensions
  const currentSize = useMemo(() => {
    const preset = canvasSizes.find(s => s.name === canvasSize)
    if (!preset || preset.width === null) return null
    if (preset.width === 'custom') return { width: customWidth, height: customHeight }
    return { width: preset.width, height: preset.height }
  }, [canvasSize, customWidth, customHeight])

  // Filter and group shaders
  const filteredShaders = useMemo(() => {
    if (!searchQuery) return customShaders
    return customShaders.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const groupedShaders = useMemo(() => groupByCategory(filteredShaders), [filteredShaders])

  // Get current props with defaults
  const currentProps = shaderMeta?.props?.reduce((acc, prop) => {
    acc[prop.name] = props[activeShader]?.[prop.name] ?? prop.default
    return acc
  }, {}) || {}

  const updateProp = (name, value) => {
    setProps(prev => ({
      ...prev,
      [activeShader]: {
        ...prev[activeShader],
        [name]: value
      }
    }))
  }

  const resetProps = () => {
    setProps(prev => ({
      ...prev,
      [activeShader]: {}
    }))
  }

  const toggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  // Export PNG at selected resolution
  const exportPNG = useCallback(() => {
    const previewCanvas = previewRef.current?.querySelector('canvas')
    if (!previewCanvas) return

    // Get export dimensions (default to 1920x1080 if Auto)
    const exportWidth = currentSize?.width || 1920
    const exportHeight = currentSize?.height || 1080

    // Create off-screen canvas at export resolution
    const offscreenCanvas = document.createElement('canvas')
    offscreenCanvas.width = exportWidth
    offscreenCanvas.height = exportHeight

    // Draw preview canvas scaled to export dimensions
    const ctx = offscreenCanvas.getContext('2d')
    ctx.drawImage(previewCanvas, 0, 0, exportWidth, exportHeight)

    // Download the image
    const link = document.createElement('a')
    link.download = `${activeShader}-${exportWidth}x${exportHeight}.png`
    link.href = offscreenCanvas.toDataURL('image/png')
    link.click()

    setShowExportMenu(false)
  }, [activeShader, currentSize])

  // Copy settings as JSON
  const copySettings = useCallback(() => {
    const settings = {
      shader: activeShader,
      props: currentProps
    }
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setShowExportMenu(false)
  }, [activeShader, currentProps])

  // Group props by their group field
  const groupedProps = useMemo(() => {
    if (!shaderMeta?.props) return {}
    const order = ['Animation', 'Effect', 'Position', 'Colors']
    const grouped = shaderMeta.props.reduce((acc, prop) => {
      const group = prop.group || 'Settings'
      if (!acc[group]) acc[group] = []
      acc[group].push(prop)
      return acc
    }, {})

    const sorted = {}
    order.forEach(g => {
      if (grouped[g]) sorted[g] = grouped[g]
    })
    Object.keys(grouped).forEach(g => {
      if (!sorted[g]) sorted[g] = grouped[g]
    })
    return sorted
  }, [shaderMeta])

  return (
    <div className="h-screen bg-[#0a0a0b] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 py-3 border-b border-[#1c1c20] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">S</div>
          <h1 className="text-base font-semibold">Shader Playground</h1>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-medium">
            {customShaders.length} Shaders
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Menu */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-violet-500/20 text-violet-300 rounded-md hover:bg-violet-500/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-[#141416] border border-[#2a2a2e] rounded-lg shadow-xl z-50 py-1">
                <button
                  onClick={exportPNG}
                  className="w-full text-left px-3 py-2 text-sm text-[#a1a1aa] hover:bg-[#1c1c20] hover:text-white flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Download PNG
                </button>
                <button
                  onClick={copySettings}
                  className="w-full text-left px-3 py-2 text-sm text-[#a1a1aa] hover:bg-[#1c1c20] hover:text-white flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied ? 'Copied!' : 'Copy Settings'}
                </button>
              </div>
            )}
          </div>

          <a
            href="https://github.com/ADelputeCoding/shader-playground"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#71717a] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Shader List */}
        <aside className="w-52 border-r border-[#1c1c20] flex flex-col shrink-0 bg-[#0c0c0d]">
          {/* Search */}
          <div className="p-3 border-b border-[#1c1c20]">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#141416] border border-[#2a2a2e] rounded-md pl-8 pr-3 py-1.5 text-xs placeholder-[#52525b] focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>

          {/* Shader List by Category */}
          <div className="flex-1 overflow-y-auto">
            {Object.entries(groupedShaders).map(([category, shaders]) => (
              <div key={category} className="border-b border-[#1c1c20]">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#141416] transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-wider text-[#71717a] font-semibold">
                    {category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#52525b]">{shaders.length}</span>
                    <svg
                      className={`w-3 h-3 text-[#52525b] transition-transform ${collapsedCategories[category] ? '' : 'rotate-90'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                {!collapsedCategories[category] && (
                  <div className="pb-1">
                    {shaders.map(shader => (
                      <button
                        key={shader.name}
                        onClick={() => setActiveShader(shader.name)}
                        className={`w-full text-left px-4 py-1.5 text-[13px] transition-colors ${
                          activeShader === shader.name
                            ? 'bg-violet-500/20 text-violet-300 border-l-2 border-violet-500'
                            : 'text-[#a1a1aa] hover:bg-[#141416] hover:text-white border-l-2 border-transparent'
                        }`}
                      >
                        {shader.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Center - Preview */}
        <main className="flex-1 bg-black relative overflow-hidden" ref={previewRef}>
          <div className="w-full h-full">
            {ShaderComponent && <ShaderComponent key={activeShader} {...currentProps} />}
          </div>

          {/* Shader name overlay */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
            <h2 className="text-sm font-medium">{shaderMeta?.name}</h2>
            <p className="text-xs text-[#71717a] max-w-xs">{shaderMeta?.description}</p>
          </div>

          {/* Export size indicator */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded px-2 py-1 text-[10px] text-[#71717a]">
            Export: {currentSize?.width || 1920} × {currentSize?.height || 1080}
          </div>
        </main>

        {/* Right Sidebar - Controls */}
        <aside className="w-72 border-l border-[#1c1c20] flex flex-col shrink-0 bg-[#0c0c0d]">
          {/* Header */}
          <div className="p-3 border-b border-[#1c1c20] flex items-center justify-between">
            <h2 className="text-sm font-medium">Controls</h2>
            <button
              onClick={resetProps}
              className="text-[10px] px-2 py-1 rounded bg-[#1c1c20] text-[#71717a] hover:text-white hover:bg-[#2a2a2e] transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Controls */}
          <div className="flex-1 overflow-y-auto p-3">
            {/* Export Size */}
            <div className="mb-5">
              <h3 className="text-[10px] uppercase tracking-wider text-[#52525b] font-semibold mb-2.5 flex items-center gap-2">
                <span>Export Size</span>
                <div className="flex-1 h-px bg-[#1c1c20]" />
              </h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {canvasSizes.map(size => (
                  <button
                    key={size.name}
                    onClick={() => setCanvasSize(size.name)}
                    className={`px-2 py-1 text-[10px] rounded transition-colors ${
                      canvasSize === size.name
                        ? 'bg-violet-500/30 text-violet-300'
                        : 'bg-[#1c1c20] text-[#71717a] hover:text-white'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              {canvasSize === 'Custom' && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    value={customWidth}
                    onChange={e => setCustomWidth(Number(e.target.value))}
                    className="w-20 bg-[#141416] border border-[#2a2a2e] rounded px-2 py-1 text-xs focus:outline-none focus:border-violet-500/50"
                    placeholder="Width"
                  />
                  <span className="text-[#52525b] self-center">×</span>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={e => setCustomHeight(Number(e.target.value))}
                    className="w-20 bg-[#141416] border border-[#2a2a2e] rounded px-2 py-1 text-xs focus:outline-none focus:border-violet-500/50"
                    placeholder="Height"
                  />
                </div>
              )}
            </div>

            {/* Shader Props */}
            {Object.entries(groupedProps).map(([group, groupProps]) => (
              <div key={group} className="mb-5">
                <h3 className="text-[10px] uppercase tracking-wider text-[#52525b] font-semibold mb-2.5 flex items-center gap-2">
                  <span>{group}</span>
                  <div className="flex-1 h-px bg-[#1c1c20]" />
                </h3>
                <div className="space-y-3">
                  {groupProps.map(prop => (
                    <div key={prop.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-[#a1a1aa]">
                          {prop.label}
                        </label>
                        {prop.type === 'range' && (
                          <span className="text-[10px] text-[#52525b] font-mono bg-[#141416] px-1.5 py-0.5 rounded">
                            {typeof currentProps[prop.name] === 'number'
                              ? currentProps[prop.name].toFixed(2)
                              : currentProps[prop.name]}
                          </span>
                        )}
                      </div>

                      {prop.type === 'color' && (
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={currentProps[prop.name]}
                            onChange={e => updateProp(prop.name, e.target.value)}
                            className="w-10 h-8 rounded cursor-pointer border border-[#2a2a2e] bg-transparent"
                          />
                          <input
                            type="text"
                            value={currentProps[prop.name]}
                            onChange={e => updateProp(prop.name, e.target.value)}
                            className="flex-1 bg-[#141416] border border-[#2a2a2e] rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-violet-500/50"
                          />
                        </div>
                      )}

                      {prop.type === 'range' && (
                        <input
                          type="range"
                          min={prop.min}
                          max={prop.max}
                          step={prop.step}
                          value={currentProps[prop.name]}
                          onChange={e => updateProp(prop.name, Number(e.target.value))}
                          className="w-full h-1.5 bg-[#2a2a2e] rounded-full appearance-none cursor-pointer
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:w-3
                            [&::-webkit-slider-thumb]:h-3
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-violet-500
                            [&::-webkit-slider-thumb]:cursor-pointer
                            [&::-webkit-slider-thumb]:transition-transform
                            [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {(!shaderMeta?.props || shaderMeta.props.length === 0) && (
              <p className="text-xs text-[#52525b] text-center py-4">
                No controls available
              </p>
            )}
          </div>

          {/* Info footer */}
          <div className="p-3 border-t border-[#1c1c20]">
            <div className="text-[10px] text-[#52525b] flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#1c1c20]">
                {shaderMeta?.category}
              </span>
              <span>Three.js + GLSL</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  )
}
