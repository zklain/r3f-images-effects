import {
  AccumulativeShadows,
  Environment,
  RandomizedLight,
  SoftShadows,
  Text,
  useTexture,
} from '@react-three/drei'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { memo, useRef } from 'react'
import { Object3D, Quaternion, Vector3 } from 'three'
import { hubabuba, neon, sunset } from './assets'
import { GroundGrid } from './components/GroundGrid'
import { ImageCard } from './components/ImageCard'

const Shadows = memo(() => (
  <AccumulativeShadows
    position={[0, -0.811, 0]}
    temporal
    frames={100}
    color="#3c3c3c"
    colorBlend={1}
    alphaTest={0.75}
    scale={10}
    opacity={0.8}
    toneMapped={true}
  >
    <RandomizedLight amount={10} radius={4} size={10} position={[5, 5, -1]} />
  </AccumulativeShadows>
))

// TODO: move card up, keep ground at 0
// TODO: aspect ratio (add a landscape photo image)
// TODO: try with CSM material
// TODO:  load image from url
// TODO: try csm materials animated with react spring
// TODO: correct animation timing when mouseOut
// todo: change bg color
// TODO: LAYOUT: horizontal || vertical if mobile
// TODO: add more effects => Follow mouse, zesnulen
// TODO: onClick focuses the card
// TODO: switching scenes

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

  // TODO: try CameraControls

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <Text
        scale={0.5}
        color="#6c6c6c"
        position={[0, -0.8, 1.02]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        Distorted Image
      </Text>
      <group onClick={onClick} onPointerMissed={onPointerMissed}>
        <ImageCard
          size={1}
          image={computer}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />
      </group>
      <color attach="background" args={['#9e9e9e']} />
      <Environment preset="city" />
      <GroundGrid />
      {/* <Shadows /> */}
      {/* <OrbitControls makeDefault /> */}
      {/* <pointLight
        color="#ffffff"
        position={[0, 5, 5]}
        intensity={1}
        castShadow
      /> */}
      {/* <CameraControls /> */}
      <SoftShadows />
    </>
  )
}

useTexture.preload(neon)
useTexture.preload(sunset)
