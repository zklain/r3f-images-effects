import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

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
