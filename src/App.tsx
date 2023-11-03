import { Canvas } from '@react-three/fiber'
import React from 'react'
import './App.css'
import { Loader } from '@/components/Loader'
import { GroundGrid } from '@/components/GroundGrid'
import { DistortedImageScene } from '@/scenes/DistortedImage'
import { INITIAL_CAMERA_POSITION } from './components/CameraRig/Rig'

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>R3F Effects</h1>
      </header>
      <Canvas shadows camera={{ fov: 40, position: INITIAL_CAMERA_POSITION }}>
        <React.Suspense fallback={<Loader />}>
          <DistortedImageScene />
        </React.Suspense>
        <GroundGrid />
      </Canvas>
    </div>
  )
}

export default App
