import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import './App.css'
import { Scene } from './Scene'
import { Box, PerspectiveCamera } from '@react-three/drei'
import { Mesh } from 'three'

const Loader = () => {
  const ref = useRef<Mesh>(null!)

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })
  return (
    <Box ref={ref} args={[1, 1, 1, 64, 64, 64]}>
      <meshWireframeMaterial />
    </Box>
  )
}

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight />
        <PerspectiveCamera />
        <React.Suspense fallback={<Loader />}>
          <Scene />
        </React.Suspense>
      </Canvas>
    </div>
  )
}

export default App
