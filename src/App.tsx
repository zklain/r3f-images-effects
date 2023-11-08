import { GroundGrid } from '@/components/GroundGrid'
import { Canvas } from '@react-three/fiber'
import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import { INITIAL_CAMERA_POSITION } from './components/CameraRig/Rig'
import { routes } from './router/routes'
import { Environment } from '@react-three/drei'

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>R3F Effects</h1>
        <nav className="navigation">
          {routes.map(({ name, path }) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
        </nav>
      </header>
      <Canvas shadows camera={{ fov: 40, position: INITIAL_CAMERA_POSITION }}>
        <Outlet />
        <GroundGrid />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default App
