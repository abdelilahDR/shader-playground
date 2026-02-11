import { memo } from 'react'

const PropControl = memo(({ prop, value, onChange }) => {
  const { name, type, label, description, min, max, step, options } = prop

  // Determine control type
  if (type === 'color' || (typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value))) {
    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-[#a1a1aa]">{label}</label>
          <span className="text-[10px] font-mono text-[#71717a]">{value}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value || '#000000'}
            onChange={e => onChange(e.target.value)}
          />
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="flex-1 text-xs font-mono bg-[#141416] border border-[#2a2a2e] rounded px-2 py-1 text-white focus:outline-none focus:border-violet-500/50"
          />
        </div>
      </div>
    )
  }

  if (type === 'range' || (typeof value === 'number' && min !== undefined)) {
    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-[#a1a1aa]">{label}</label>
          <span className="text-[10px] font-mono text-[#71717a]">{typeof value === 'number' ? value.toFixed(step && step < 1 ? 2 : 0) : value}</span>
        </div>
        <input
          type="range"
          min={min ?? 0}
          max={max ?? 100}
          step={step ?? 1}
          value={value ?? 0}
          onChange={e => onChange(parseFloat(e.target.value))}
        />
      </div>
    )
  }

  if (type === 'toggle' || typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-between">
        <label className="text-xs text-[#a1a1aa]">{label}</label>
        <button
          onClick={() => onChange(!value)}
          className={`w-9 h-5 rounded-full transition-colors relative ${value ? 'bg-violet-500' : 'bg-[#2a2a2e]'}`}
        >
          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'left-[18px]' : 'left-0.5'}`} />
        </button>
      </div>
    )
  }

  if (type === 'select' || options) {
    return (
      <div>
        <label className="text-xs text-[#a1a1aa] mb-1 block">{label}</label>
        <select
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          className="w-full text-xs bg-[#141416] border border-[#2a2a2e] rounded px-2 py-1.5 text-white focus:outline-none focus:border-violet-500/50"
        >
          {(options || []).map(opt => {
            const optValue = typeof opt === 'object' ? opt.value : opt
            const optLabel = typeof opt === 'object' ? opt.label : opt
            return (
              <option key={optValue} value={optValue}>{optLabel}</option>
            )
          })}
        </select>
      </div>
    )
  }

  if (type === 'position' || (typeof value === 'object' && value !== null && 'x' in value && 'y' in value)) {
    return (
      <div>
        <label className="text-xs text-[#a1a1aa] mb-1 block">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-[#71717a]">X: {(value?.x ?? 0.5).toFixed(2)}</span>
            <input type="range" min={0} max={1} step={0.01} value={value?.x ?? 0.5}
              onChange={e => onChange({ ...value, x: parseFloat(e.target.value) })} />
          </div>
          <div>
            <span className="text-[10px] text-[#71717a]">Y: {(value?.y ?? 0.5).toFixed(2)}</span>
            <input type="range" min={0} max={1} step={0.01} value={value?.y ?? 0.5}
              onChange={e => onChange({ ...value, y: parseFloat(e.target.value) })} />
          </div>
        </div>
      </div>
    )
  }

  // Fallback: text/number input
  if (typeof value === 'number') {
    return (
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-[#a1a1aa]">{label}</label>
          <span className="text-[10px] font-mono text-[#71717a]">{value}</span>
        </div>
        <input
          type="range"
          min={min ?? 0}
          max={max ?? Math.max(value * 3, 100)}
          step={step ?? (value < 1 ? 0.01 : 1)}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
        />
      </div>
    )
  }

  // String fallback
  return (
    <div>
      <label className="text-xs text-[#a1a1aa] mb-1 block">{label}</label>
      <input
        type="text"
        value={typeof value === 'object' ? JSON.stringify(value) : (value ?? '')}
        onChange={e => {
          try { onChange(JSON.parse(e.target.value)) } catch { onChange(e.target.value) }
        }}
        className="w-full text-xs font-mono bg-[#141416] border border-[#2a2a2e] rounded px-2 py-1.5 text-white focus:outline-none focus:border-violet-500/50"
      />
    </div>
  )
})

export default PropControl
