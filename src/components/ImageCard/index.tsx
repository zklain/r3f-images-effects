import { useSpring } from '@react-spring/three'
import { useCursor } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { geometry } from 'maath'
import { useCallback, useRef, useState } from 'react'
import { DoubleSide, Texture } from 'three'
import { AnimatedImageMaterial } from './DistortedImageMaterial'
import { DistortedImageMaterialRefType } from './types'

export const GOLDEN_RATIO = 1.618

const springConfig = { mass: 5, friction: 50, tension: 120 }

type IFrameProps = Omit<JSX.IntrinsicElements['mesh'], 'scale'> & {
  /**
   * Size of the card
   */
  scale?: number | [number, number]

  /**
   * Image texture to display
   */
  texture: Texture

  /**
   * Image zoom
   */
  zoom?: number

  /**
   *  Scale of the noise
   */
  noiseScale?: number

  /**
   * Speed of the noise movement
   */
  noiseSpeed?: number
}

// todo: support url
export const ImageCard = ({
  scale = 1,
  texture,
  noiseScale = 3,
  noiseSpeed = 0.5,
  zoom = 1,
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

  extend(geometry)

  const planeBounds: [x: number, y: number] = Array.isArray(scale)
    ? [scale[0], scale[1]]
    : [scale, scale]

  const imageBounds: [x: number, y: number] = [
    texture!.image.width,
    texture!.image.height,
  ]

  return (
    <mesh
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={Array.isArray(scale) ? [...scale, 1] : scale}
      {...props}
    >
      <roundedPlaneGeometry args={[1, 1, 0.08]} />
      {/* @ts-ignore it's ok */}
      <AnimatedImageMaterial
        side={DoubleSide}
        ref={matRef}
        {...springs}
        uNoiseScale={noiseScale}
        uNoiseSpeed={noiseSpeed}
        uImageBounds={imageBounds}
        uScale={planeBounds}
        imageTexture={texture}
        uZoom={zoom}
        toneMapped
      />
    </mesh>
  )
}
