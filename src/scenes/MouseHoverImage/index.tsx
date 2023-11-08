import { greenHorse } from '@/assets'
import { CameraRig, Focusable } from '@/components/CameraRig'
import { MousePositionDistortedImage } from '@/components/MousePositionImage'
import { DescriptionText, TitleText } from '@/components/SceneTypo'
import { GOLDEN_RATIO } from '@/utils/consts'
import { a, useSpring } from '@react-spring/three'
import { useTexture } from '@react-three/drei'

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
        Click the image to focus on it.
        {'\n'}
        {'\n'}
        Hover the image to displace the image underneath the cursor.
        {'\n'}
        {'\n'}
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
    </a.group>
  )
}

useTexture.preload(greenHorse)
