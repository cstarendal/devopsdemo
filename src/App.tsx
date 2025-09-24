import { useState } from 'react'
import './App.css'

function App() {
  const [isOn, setIsOn] = useState(false)

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Hello World</h1>
        <button onClick={() => setIsOn((v) => !v)}>
          Toggle: {isOn ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  )
}

export default App
