import { Canvas } from '@react-three/fiber'
import React from 'react'
import './App.css'
import { Scene } from './Scene'
import { Loader } from './components/Loader'
import { GroundGrid } from './components/GroundGrid'

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>R3F Effects</h1>
        <nav>
          <a />
        </nav>
      </header>
      <Canvas shadows camera={{ fov: 40, position: [6, 3, 8] }}>
        <React.Suspense fallback={<Loader />}>
          <Scene />
        </React.Suspense>
        <GroundGrid />
      </Canvas>
    </div>
  )
}

export default App
