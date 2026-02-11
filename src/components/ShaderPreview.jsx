import { useState, useRef, useEffect, memo, useMemo } from 'react'
import * as ShaderComponents from 'shaders/react'
import ShaderErrorBoundary from './ShaderErrorBoundary'

const { Shader, Checkerboard } = ShaderComponents

// Shaders that need external resources and should show fallback
const SKIP_IN_PREVIEW = ['ImageTexture', 'VideoTexture', 'WebcamTexture']

const ShaderPreview = memo(({ shader, fallback }) => {
  const containerRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [hasError, setHasError] = useState(false)

  const Component = ShaderComponents[shader.name]

  // Check if this shader should be skipped
  const shouldSkip = SKIP_IN_PREVIEW.includes(shader.name)

  // Build default props from shader.props
  const defaultProps = useMemo(() => {
    const props = {}
    shader.props.forEach(p => {
      props[p.name] = p.default
    })
    return props
  }, [shader])

  // Lazy loading via IntersectionObserver with improved timing
  useEffect(() => {
    if (!containerRef.current || shouldSkip) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldRender) {
          // Double requestAnimationFrame to ensure layout is computed
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setShouldRender(true)
            })
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [shouldRender, shouldSkip])

  // Fallback content
  const renderFallback = () => fallback || (
    <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <span className="text-2xl opacity-40">⚠️</span>
    </div>
  )

  // If component doesn't exist, should be skipped, or had an error, show fallback
  if (!Component || hasError || shouldSkip) {
    return <div ref={containerRef} className="h-full w-full">{renderFallback()}</div>
  }

  return (
    <div ref={containerRef} className="h-full w-full" style={{ minHeight: '128px' }}>
      {shouldRender ? (
        <ShaderErrorBoundary
          shaderName={shader.name}
          fallback={renderFallback()}
          onError={() => setHasError(true)}
        >
          <Shader style={{ width: '100%', height: '100%', display: 'block' }}>
            {shader.requiresChild ? (
              <Component {...defaultProps}>
                {/* Use Checkerboard shader as child for filter shaders - more visible transforms */}
                <Checkerboard
                  colorA="#667eea"
                  colorB="#3b2f63"
                  cells={8}
                />
              </Component>
            ) : (
              <Component {...defaultProps} />
            )}
          </Shader>
        </ShaderErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  )
})

export default ShaderPreview
