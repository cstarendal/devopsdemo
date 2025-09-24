import { useState } from 'react'
import './App.css'
import { readFeatureFlag, writeFeatureFlag, getEnvLabel } from './flags'

function App() {
  const [isOn, setIsOn] = useState(false)
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

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#111827', color: '#f9fafb', padding: '16px 16px', fontSize: 28, fontWeight: 800, letterSpacing: 0.5, zIndex: 1000, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
        Environment: {envName}
      </div>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', paddingTop: 80 }}>
          <h1>Hello World</h1>
          <button onClick={() => setIsOn((v) => !v)}>
            Toggle: {isOn ? 'ON' : 'OFF'}
          </button>
          {/* New Feature area */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>
              New Feature: {newFeatureOn ? 'ON' : 'OFF'}
            </div>
            {canToggleFeatures ? (
              <button onClick={handleToggleFeature}>
                {newFeatureOn ? 'Disable' : 'Enable'} new features (prod only)
              </button>
            ) : (
              <div style={{ fontSize: 12, color: '#6b7280' }}>
                In {envName}, new features are always ON
              </div>
            )}
          </div>

          {/* Smiley feature */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>
              Smiley Feature: {smileyOn ? 'ON' : 'OFF'}
            </div>
            {canToggleFeatures ? (
              <button onClick={handleToggleSmiley}>
                {smileyOn ? 'Disable' : 'Enable'} smiley (prod only)
              </button>
            ) : (
              <div style={{ fontSize: 12, color: '#6b7280' }}>
                In {envName}, new features are always ON
              </div>
            )}
          </div>

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
