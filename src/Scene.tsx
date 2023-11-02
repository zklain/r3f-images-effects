import {
  Environment,
  Scroll,
  ScrollControls,
  useTexture,
} from '@react-three/drei'
import './App.css'
import { brokebackMountain, neon, sunset } from './assets'
import { ImageCard } from './components/ImageCard'

// TODO: add
// TODO: aspect ratio (add a landscape photo image)
// TODO: try csm materials animated with react spring
// TODO: correct animation timing
// todo: change bg color
// TODO: LAYOUT: horizontal || vertical if mobile
// TODO: add more effects => Follow mouse, zesnulen
export const Scene = () => {
  const [neonTexture, sunsetTexture, horseImage] = useTexture([
    neon,
    sunset,
    brokebackMountain,
  ])

  return (
    <>
      <ScrollControls horizontal pages={2}>
        <Scroll>
          <ImageCard image={neonTexture} position={[0, 0, 0]} />
          <ImageCard
            image={sunsetTexture}
            noiseScale={2}
            noiseSpeed={0.3}
            position={[6, 1, 0]}
          />
          <ImageCard
            image={horseImage}
            noiseScale={5}
            noiseSpeed={0.3}
            position={[12, -1, 0]}
          />
          <color attach="background" args={['#000000']} />
        </Scroll>
      </ScrollControls>
      <Environment preset="forest" />
    </>
  )
}

useTexture.preload(neon)
useTexture.preload(sunset)
