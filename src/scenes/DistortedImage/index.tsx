import { GOLDEN_RATIO, ImageCard } from '@/components/ImageCard'
import { Environment, Text, useTexture } from '@react-three/drei'
import { hubabuba } from '@/assets'
import { CameraRig, Focusable } from '@/components/CameraRig'
import { a, useSpring } from '@react-spring/three'

export const DistortedImageScene = ({}) => {
  const [computer] = useTexture([hubabuba])

  const animation = useSpring({
    from: {
      position: [-10, 0, 0] as [x: number, y: number, z: number],
    },
    to: {
      position: [0, 0, 0],
    },
  })

  return (
    <a.group {...animation}>
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
    </a.group>
  )
}

useTexture.preload(hubabuba)
