import { GOLDEN_RATIO, ImageCard } from '@/components/ImageCard'
import { Environment, Text, useTexture } from '@react-three/drei'
import { hubabuba } from './assets'
import { CameraRig, Focusable } from './components/CameraRig'

// TODO: try with CSM material & spring
// TODO: correct animation timing when mouseOut
// TODO: enter animation

export const Scene = ({}) => {
  const [computer] = useTexture([hubabuba])

  return (
    <>
      <Text
        color="#757575"
        position={[0, 0.001, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
      >
        Distorted Image
      </Text>
      <group position={[0, GOLDEN_RATIO / 2, 0]}>
        <Focusable>
          <ImageCard
            name="image"
            scale={[1, GOLDEN_RATIO]}
            texture={computer}
            castShadow
            receiveShadow
          />
        </Focusable>
      </group>

      <color attach="background" args={['#9e9e9e']} />
      <Environment preset="city" />
      <CameraRig />
    </>
  )
}

useTexture.preload(hubabuba)
