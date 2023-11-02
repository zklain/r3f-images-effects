import {
  AccumulativeShadows,
  Box,
  Center,
  Environment,
  Grid,
  OrbitControls,
  Plane,
  RandomizedLight,
  SoftShadows,
  Text,
  useTexture,
} from '@react-three/drei'
import { useControls } from 'leva'
import { memo } from 'react'
import './App.css'
import { brokebackMountain, hubabuba, neon, sunset } from './assets'
import { ImageCard } from './components/ImageCard'

const Shadows = memo(() => (
  <AccumulativeShadows
    position={[0, -0.811, 0]}
    temporal
    frames={100}
    color="#3c3c3c"
    colorBlend={0.5}
    alphaTest={0.75}
    scale={10}
    opacity={0.8}
    toneMapped={true}
  >
    <RandomizedLight amount={10} radius={4} size={10} position={[3, 4, 5]} />
  </AccumulativeShadows>
))
// TODO: aspect ratio (add a landscape photo image)
// TODO: try with CSM material
// TODO: try csm materials animated with react spring
// TODO: correct animation timing
// todo: change bg color
// TODO: LAYOUT: horizontal || vertical if mobile
// TODO: add more effects => Follow mouse, zesnulen
// TODO: onClick focuses the card
export const Scene = () => {
  const [neonTexture, sunsetTexture, horseImage, computer] = useTexture([
    neon,
    sunset,
    brokebackMountain,
    hubabuba,
  ])

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
      <ImageCard
        size={1}
        image={computer}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      />
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
      <Shadows />
      <OrbitControls makeDefault />
      <pointLight
        color="#ffffff"
        position={[0, 5, 5]}
        intensity={0.3}
        castShadow
      />
      {/* <Plane
        receiveShadow
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.83, 0]}
      >
        <meshStandardMaterial color="#9e9e9e" envMapIntensity={0.3} />
      </Plane> */}
      <SoftShadows />
    </>
  )
}

useTexture.preload(neon)
useTexture.preload(sunset)
