import { memo } from 'react'
import ShaderPreview from './ShaderPreview'

const categoryColors = {
  'Blurs': 'from-blue-500/20 to-cyan-500/20',
  'Stylize': 'from-purple-500/20 to-pink-500/20',
  'Textures': 'from-green-500/20 to-emerald-500/20',
  'Adjustments': 'from-amber-500/20 to-orange-500/20',
  'Distortions': 'from-red-500/20 to-rose-500/20',
  'Interactive': 'from-violet-500/20 to-indigo-500/20',
  'Utilities': 'from-gray-500/20 to-zinc-500/20',
}

const categoryIcons = {
  'Blurs': '◎',
  'Stylize': '✦',
  'Textures': '◆',
  'Adjustments': '◐',
  'Distortions': '◇',
  'Interactive': '⚡',
  'Utilities': '⚙',
}

const ShaderCard = memo(({ shader, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(shader)}
      className="group relative bg-[#141416] border border-[#2a2a2e] rounded-xl overflow-hidden hover:border-violet-500/40 transition-all duration-200 text-left w-full hover:shadow-lg hover:shadow-violet-500/5"
    >
      {/* Preview area */}
      <div className="h-32 bg-black rounded-t-xl overflow-hidden">
        <ShaderPreview
          shader={shader}
          fallback={
            <div className={`h-full w-full bg-gradient-to-br ${categoryColors[shader.category] || 'from-gray-500/20 to-zinc-500/20'} flex items-center justify-center`}>
              <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
                {categoryIcons[shader.category] || '◆'}
              </span>
            </div>
          }
        />
      </div>
      
      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm text-white group-hover:text-violet-300 transition-colors">
            {shader.name}
          </h3>
          {shader.requiresChild && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
              RTT
            </span>
          )}
        </div>
        <p className="text-xs text-[#71717a] line-clamp-2 leading-relaxed">
          {shader.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1c1c20] text-[#71717a]">
            {shader.category}
          </span>
          <span className="text-[10px] text-[#71717a]">
            {shader.props.length} prop{shader.props.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </button>
  )
})

export default function ShaderGrid({ shaders, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {shaders.map(s => (
        <ShaderCard key={s.name} shader={s} onSelect={onSelect} />
      ))}
    </div>
  )
}
