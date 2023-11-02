import {
  AccumulativeShadows,
  Box,
  CameraControls,
  Center,
  Environment,
  Grid,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  RandomizedLight,
  SoftShadows,
  Text,
  useTexture,
} from '@react-three/drei'
import { useControls } from 'leva'
import { memo, useEffect, useRef, useState } from 'react'
import './App.css'
import { brokebackMountain, hubabuba, neon, sunset } from './assets'
import { GOLDEN_RATIO, ImageCard } from './components/ImageCard'
import { Object3D, Quaternion, Vector3 } from 'three'
import { ThreeElements, ThreeEvent, useFrame } from '@react-three/fiber'
import { easing } from 'maath'

// const Shadows = memo(() => (
//   <AccumulativeShadows
//     position={[0, -0.811, 0]}
//     temporal
//     frames={100}
//     color="#3c3c3c"
//     colorBlend={0.5}
//     alphaTest={0.75}
//     scale={10}
//     opacity={0.8}
//     toneMapped={true}
//   >
//     <RandomizedLight amount={10} radius={4} size={10} position={[3, 4, 5]} />
//   </AccumulativeShadows>
// ))
// TODO: aspect ratio (add a landscape photo image)
// TODO: try with CSM material
// TODO:  load image from url
// TODO: try csm materials animated with react spring
// TODO: correct animation timing when mouseOut
// todo: change bg color
// TODO: LAYOUT: horizontal || vertical if mobile
// TODO: add more effects => Follow mouse, zesnulen
// TODO: onClick focuses the card

const INITIAL_CAMERA_POSITION: [x: number, y: number, z: number] = [6, 3, 8]

export const Scene = ({
  q = new Quaternion(),
  p = new Vector3(...INITIAL_CAMERA_POSITION),
}) => {
  const [neonTexture, sunsetTexture, horseImage, computer] = useTexture([
    neon,
    sunset,
    brokebackMountain,
    hubabuba,
  ])

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

  const onPointerMissed = (e) => {
    // TODO: this is the default camera position
    e.stopPropagation()
    resetCamera()
  }

  // TODO: try controls

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
      {/* </Center> */}
      <group onClick={onClick} onPointerMissed={onPointerMissed}>
        <ImageCard
          size={1}
          image={computer}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />
      </group>
      {/* <Box position={[2, 0, 0]} castShadow /> */}
      <color attach="background" args={['#9e9e9e']} />
      <Environment preset="city" />
      <Grid
        position={[0, -0.81, 0]}
        args={[10.5, 10.5]}
        cellSize={0.5}
        cellThickness={1}
        cellColor="#7f7f7f"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#797979"
        fadeDistance={25}
        fadeStrength={1}
        infiniteGrid
      />
      {/* <Shadows /> */}
      {/* <OrbitControls makeDefault /> */}
      {/* <pointLight
        color="#ffffff"
        position={[0, 5, 5]}
        intensity={0.3}
        castShadow
      /> */}
      {/* <CameraControls /> */}
      <SoftShadows />
    </>
  )
}

useTexture.preload(neon)
useTexture.preload(sunset)
