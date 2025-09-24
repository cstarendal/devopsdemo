import { useState } from 'react'
import './App.css'
import { readFeatureFlag, writeFeatureFlag, getEnvLabel, resetOverridesForCurrentVersion } from './flags'

function App() {
  const envName = getEnvLabel()
  const [newFeatureOn, setNewFeatureOn] = useState<boolean>(readFeatureFlag('newFeature'))
  const [smileyOn, setSmileyOn] = useState<boolean>(readFeatureFlag('smiley'))
  const [heartOn, setHeartOn] = useState<boolean>(readFeatureFlag('heart'))
  const [greenSmiley, setGreenSmiley] = useState<boolean>(readFeatureFlag('greenSmiley'))

  const canToggleFeatures = envName === 'Production'


  const handleToggleAllFeatures = () => {
    const allOn = newFeatureOn && smileyOn && heartOn && greenSmiley
    const next = !allOn
    writeFeatureFlag('newFeature', next)
    writeFeatureFlag('smiley', next)
    writeFeatureFlag('heart', next)
    writeFeatureFlag('greenSmiley', next)
    setNewFeatureOn(next)
    setSmileyOn(next)
    setHeartOn(next)
    setGreenSmiley(next)
  }

  const bannerHeight = 80
  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#111827', color: '#f9fafb', padding: '0 16px', fontSize: 28, fontWeight: 800, letterSpacing: 0.5, zIndex: 1000, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, height: bannerHeight }}>
        <span>Environment: {envName}</span>
        {canToggleFeatures && envName === 'Production' && (
          <button
            onClick={handleToggleAllFeatures}
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: '8px 12px',
              background: '#f59e0b',
              color: '#111827',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            {newFeatureOn && smileyOn ? 'Disable all new features' : 'Enable all new features'}
          </button>
        )}
        {envName === 'Production' && (
          <button
            onClick={() => {
              resetOverridesForCurrentVersion();
              // reflect resets immediately
              setNewFeatureOn(readFeatureFlag('newFeature'))
              setSmileyOn(readFeatureFlag('smiley'))
              setHeartOn(readFeatureFlag('heart'))
              setGreenSmiley(readFeatureFlag('greenSmiley'))
            }}
            style={{
              fontSize: 12,
              padding: '6px 10px',
              background: '#e5e7eb',
              color: '#111827',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            Reset UI
          </button>
        )}
      </div>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <div style={{ paddingTop: bannerHeight + 32, width: '100%' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ margin: '0 0 16px 0' }}>Hello World</h1>
          {/* Feature controls moved to banner; no per-feature controls here */}
            <div data-testid="features-strip" style={{ height: 160, marginTop: 32, display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
            {smileyOn && (
                <div role="img" aria-label="smiley" style={{ color: greenSmiley ? '#10b981' : undefined }}>
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: 'inline-block' }}
                  >
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                    <circle cx="9" cy="10" r="1.2" fill="currentColor" />
                    <circle cx="15" cy="10" r="1.2" fill="currentColor" />
                    <path d="M7.5 14c1.2 1.3 2.8 2 4.5 2s3.3-.7 4.5-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
            )}
            {heartOn && (
              <svg
                role="img"
                aria-label="heart"
                width="120"
                height="120"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'inline-block' }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.5h.56C12.09 5.01 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={greenSmiley ? '#10b981' : '#ef4444'}
                />
              </svg>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
