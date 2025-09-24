import { useState } from 'react'
import './App.css'

function App() {
  const [isOn, setIsOn] = useState(false)
  const envName = import.meta.env.VITE_ENV_NAME ?? 'Local'

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#111827', color: '#f9fafb', padding: '8px 12px', fontSize: 14, zIndex: 1000, textAlign: 'center' }}>
        Environment: {envName}
      </div>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', paddingTop: 32 }}>
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
