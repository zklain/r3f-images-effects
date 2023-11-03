import { GOLDEN_RATIO, ImageCard } from '@/components/ImageCard'
import { Environment, OrbitControls, Text, useTexture } from '@react-three/drei'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import { Object3D, Quaternion, Vector3 } from 'three'
import { hubabuba } from './assets'

// const Shadows = memo(() => (
//   <AccumulativeShadows
//     position={[0, -0.811, 0]}
//     temporal
//     frames={100}
//     color="#3c3c3c"
//     colorBlend={1}
//     alphaTest={0.75}
//     scale={10}
//     opacity={0.8}
//     toneMapped={true}
//   >
//     <RandomizedLight amount={10} radius={4} size={10} position={[5, 5, -1]} />
//   </AccumulativeShadows>
// ))

// TODO: move card up, keep ground at 0
// TODO: try with CSM material & spring
// TODO: correct animation timing when mouseOut
// TODO: onClick focuses the card
// TODO: try CameraControls
// TODO: come in animation
// TODO: extract focusable

const INITIAL_CAMERA_POSITION: [x: number, y: number, z: number] = [6, 3, 8]

export const Scene = ({
  q = new Quaternion(),
  p = new Vector3(...INITIAL_CAMERA_POSITION),
}) => {
  const [computer] = useTexture([hubabuba])

  const selected = useRef<Object3D>()

  const resetCamera = () => {
    p.set(...INITIAL_CAMERA_POSITION)
    q.identity()
    selected.current = undefined
  }

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (!selected.current) {
      selected.current = e.object
      e.object.updateWorldMatrix(true, true)
      e.object.localToWorld(p.set(0, 0, 3.5))
      e.object.getWorldQuaternion(q)
    } else {
      resetCamera()
    }
  }

  const onPointerMissed = (e: MouseEvent) => {
    e.stopPropagation()
    resetCamera()
  }

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <Text
        color="#757575"
        position={[0, -GOLDEN_RATIO / 2, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
      >
        Distorted Image
      </Text>
      <group
        onClick={onClick}
        onPointerMissed={onPointerMissed}
        position={[0, 0, 0]}
      >
        <ImageCard
          scale={[1, GOLDEN_RATIO]}
          texture={computer}
          castShadow
          receiveShadow
        />
      </group>

      <color attach="background" args={['#9e9e9e']} />
      <Environment preset="city" />
      <OrbitControls />
    </>
  )
}

useTexture.preload(hubabuba)
