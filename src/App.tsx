import { useState } from 'react'
import './App.css'

function App() {
  const [isOn, setIsOn] = useState(false)
  const envName = import.meta.env.VITE_ENV_NAME ?? 'Local'

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
        </div>
      </div>
    </div>
  )
}

export default App
