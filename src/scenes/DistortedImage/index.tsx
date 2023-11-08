import { sunset } from '@/assets'
import { CameraRig, Focusable } from '@/components/CameraRig'
import { DistortedImageCard } from '@/components/DistortedImageCard'
import { DescriptionText, TitleText } from '@/components/SceneTypo'
import { GOLDEN_RATIO } from '@/utils/consts'
import { a, useSpring } from '@react-spring/three'
import { Environment, useTexture } from '@react-three/drei'

export const DistortedImageScene = ({}) => {
  const [texture] = useTexture([sunset])

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
      <TitleText>Distorted Image</TitleText>
      <DescriptionText>
        Distortion effect done by displacing the UV coordinates using a perlin
        noise function.
        {'\n'}
        {'\n'}
        Try hovering the image to see the original.
        {'\n'}
        {'\n'}
        Click the image to focus on it.
      </DescriptionText>
      <group position={[0, GOLDEN_RATIO / 2, 0]}>
        <Focusable>
          <DistortedImageCard
            name="image"
            scale={[1, GOLDEN_RATIO]}
            texture={texture}
            castShadow
            receiveShadow
          />
        </Focusable>
      </group>

      <CameraRig />
    </a.group>
  )
}
