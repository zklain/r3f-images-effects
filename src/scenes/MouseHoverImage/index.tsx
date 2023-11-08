import { Environment, Text, useTexture } from '@react-three/drei'
import { greenHorse } from '@/assets'
import { CameraRig, Focusable } from '@/components/CameraRig'
import { a, useSpring } from '@react-spring/three'
import { DescriptionText, TitleText } from '@/components/SceneTypo'
import { MousePositionDistortedImage } from '@/components/MousePositionImage'
import { GOLDEN_RATIO } from '@/utils/consts'

export const MouseHoverImage = ({}) => {
  const [texture] = useTexture([greenHorse])

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
      <TitleText maxWidth={3}>Mouse Hover Distortion</TitleText>

      <DescriptionText position={[0, 0.001, 1.5]}>
        Distortion effect done by displacing the UV coordinates using a perlin
        noise function.
        {'\n'}
        {'\n'}
        Try hovering the image to displace the texture where
        {'\n'}
        {'\n'}
        Click the image to focus on it.
      </DescriptionText>
      <group position={[0, GOLDEN_RATIO / 2, 0]}>
        <Focusable>
          <MousePositionDistortedImage
            name="mouse-position-image"
            scale={[1, GOLDEN_RATIO]}
            texture={texture}
          />
        </Focusable>
      </group>

      <CameraRig />
    </a.group>
  )
}

useTexture.preload(greenHorse)
