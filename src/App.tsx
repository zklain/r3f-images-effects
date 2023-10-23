import { Box, Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import './App.css'

function App() {
  return (
    <div className="App">
      <Canvas>
        <OrbitControls makeDefault />
        <ambientLight />
        <color attach="background" args={['#2d1b50']} />
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="white" />
        </Box>
        <Environment preset="forest" />
      </Canvas>
    </div>
  )
}

export default App
