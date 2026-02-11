import { useState, useMemo } from 'react'
import { shaderComponents } from './shaderData'
import ShaderGrid from './components/ShaderGrid'
import ShaderDetail from './components/ShaderDetail'

const categories = ['All', ...new Set(shaderComponents.map(s => s.category))]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [showChildOnly, setShowChildOnly] = useState(false)

  const filtered = useMemo(() => {
    return shaderComponents.filter(s => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && 
          !s.description.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'All' && s.category !== category) return false
      if (showChildOnly && !s.requiresChild) return false
      return true
    })
  }, [search, category, showChildOnly])

  if (selected) {
    return <ShaderDetail shader={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0b]/80 border-b border-[#2a2a2e]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">S</div>
              <h1 className="text-xl font-semibold tracking-tight">Shader Playground</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-medium">
                {shaderComponents.length} components
              </span>
            </div>
{/* GitHub link - docs coming soon */}
            <a href="https://github.com/abdelilahDR/shader-playground" target="_blank" rel="noopener"
               className="text-sm text-[#71717a] hover:text-white transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
          
          {/* Search & Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search shaders..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#141416] border border-[#2a2a2e] rounded-lg text-sm text-white placeholder-[#71717a] focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    category === cat
                      ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30'
                      : 'text-[#71717a] hover:text-white hover:bg-[#1c1c20]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-sm text-[#71717a] mb-4">
          {filtered.length} shader{filtered.length !== 1 ? 's' : ''}
        </div>
        <ShaderGrid shaders={filtered} onSelect={setSelected} />
      </main>
    </div>
  )
}
