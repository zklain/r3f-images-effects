import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Mesh } from 'three'
import './App.css'
import { Scene } from './Scene'

// TODO: move out
export const Loader = () => {
  const ref = useRef<Mesh>(null!)

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1, 16, 16, 16]} />
      <meshBasicMaterial wireframe />
    </mesh>
  )
}

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
