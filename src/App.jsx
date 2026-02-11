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
            <a href="https://shaders.com/docs" target="_blank" rel="noopener" 
               className="text-sm text-[#71717a] hover:text-white transition-colors">
              Docs ↗
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
