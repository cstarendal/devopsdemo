import { useState } from 'react'
import './App.css'
import { readFeatureFlag, writeFeatureFlag, getEnvLabel } from './flags'

function App() {
  const envName = getEnvLabel()
  const [newFeatureOn, setNewFeatureOn] = useState<boolean>(readFeatureFlag('newFeature'))
  const [smileyOn, setSmileyOn] = useState<boolean>(readFeatureFlag('smiley'))

  const canToggleFeatures = envName === 'Production'

  const handleToggleFeature = () => {
    const next = !newFeatureOn
    writeFeatureFlag('newFeature', next)
    setNewFeatureOn(next)
  }

  const handleToggleSmiley = () => {
    const next = !smileyOn
    writeFeatureFlag('smiley', next)
    setSmileyOn(next)
  }

  const handleToggleAllFeatures = () => {
    const allOn = newFeatureOn && smileyOn
    const next = !allOn
    writeFeatureFlag('newFeature', next)
    writeFeatureFlag('smiley', next)
    setNewFeatureOn(next)
    setSmileyOn(next)
  }

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#111827', color: '#f9fafb', padding: '16px 16px', fontSize: 28, fontWeight: 800, letterSpacing: 0.5, zIndex: 1000, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        <span>Environment: {envName}</span>
        {canToggleFeatures && (
          <button
            onClick={handleToggleAllFeatures}
            style={{
              marginLeft: 16,
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
      </div>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', paddingTop: 80 }}>
          <h1>Hello World</h1>
          {/* Feature controls moved to banner; no per-feature controls here */}

          {smileyOn && (
            <div style={{ fontSize: 120, marginTop: 32 }} role="img" aria-label="smiley">
              <span style={{ display: 'inline-block', lineHeight: 1 }}>
                😄
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
