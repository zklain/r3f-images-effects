import { useSpring } from '@react-spring/three'
import { useCursor } from '@react-three/drei'
import { MeshProps, extend, useFrame } from '@react-three/fiber'
import { useCallback, useRef, useState } from 'react'
import { DoubleSide, Texture } from 'three'
import { AnimatedImageMaterial } from './DistortedImageMaterial'
import { DistortedImageMaterialRefType } from './types'
import { geometry } from 'maath'

extend(geometry)

export const GOLDEN_RATIO = 1.618

const springConfig = { mass: 5, friction: 50, tension: 120 }

interface IFrameProps extends MeshProps {
  /**
   * Size of the card
   */
  size?: number

  /**
   * Image texture to display
   */
  image: Texture

  /**
   *  Scale of the noise
   */
  noiseScale?: number

  /**
   * Speed of the noise movement
   */
  noiseSpeed?: number
}

export const ImageCard = ({
  size = 1,
  image,
  noiseScale = 3,
  noiseSpeed = 0.5,
  ...props
}: IFrameProps) => {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const matRef = useRef<DistortedImageMaterialRefType>(null!)

  const springs = useSpring({
    uNoiseStrength: hovered ? 0 : 1,
    clamp: true,
    config: springConfig,
  })

  const onPointerOver = useCallback(() => {
    setHovered(true)
  }, [setHovered])

  const onPointerOut = useCallback(() => {
    setHovered(false)
  }, [setHovered])

  useFrame((state, t) => {
    matRef.current.uTime = state.clock.getElapsedTime()
  })

  // TODO: extend JSX
  return (
    <mesh onPointerOver={onPointerOver} onPointerOut={onPointerOut} {...props}>
      {/* @ts-ignore it's ok */}
      <roundedPlaneGeometry args={[size, size * GOLDEN_RATIO, 0.1]} />
      {/* @ts-ignore it's ok */}
      <AnimatedImageMaterial
        side={DoubleSide}
        ref={matRef}
        {...springs}
        uScale={noiseScale}
        uSpeed={noiseSpeed}
        map={image}
      />
    </mesh>
  )
}
