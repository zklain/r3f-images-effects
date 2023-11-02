import { Canvas } from '@react-three/fiber'
import React from 'react'
import './App.css'
import { Scene } from './Scene'
import { Loader } from './components/Loader'

function App() {
  return (
    <div className="App">
      <Canvas shadows camera={{ fov: 30, position: [6, 3, 8] }}>
        <React.Suspense fallback={<Loader />}>
          <Scene />
        </React.Suspense>
      </Canvas>
    </div>
  )
}

export default App
