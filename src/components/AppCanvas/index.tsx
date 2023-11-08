import { GroundGrid } from '@/components/GroundGrid'
import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Outlet } from 'react-router-dom'
import { CameraRig } from '../CameraRig'

export const AppCanvas = () => {
  return (
    <Canvas shadows>
      <Outlet />
      <CameraRig />
      <GroundGrid />
      <Environment preset="city" />
      <color attach="background" args={['#c7c7c7']} />
    </Canvas>
  )
}
