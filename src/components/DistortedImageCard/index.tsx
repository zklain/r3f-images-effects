import { useSpring } from '@react-spring/three'
import { useCursor, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { geometry } from 'maath'
import { ForwardedRef, forwardRef, useCallback, useRef, useState } from 'react'
import { DoubleSide, Mesh, Texture } from 'three'
import { AnimatedDistortedImageMaterial } from './DistortedImageMaterial'
import type { DistortedImageMaterialRefType } from './types'

type ImageCardGeoProps = Omit<JSX.IntrinsicElements['mesh'], 'scale'> & {
  /**
   * Size of the card
   */
  scale?: number | [x: number, y: number]
}

export const ImageCardGeo = forwardRef(
  (
    { children, scale, ...props }: ImageCardGeoProps,
    ref: ForwardedRef<Mesh>,
  ) => {
    extend(geometry)

    return (
      <mesh ref={ref} {...props}>
        <roundedPlaneGeometry
          args={[
            ...((Array.isArray(scale) ? scale : [scale, scale]) as [
              number,
              number,
            ]),
            0.08,
          ]}
        />
        {children}
      </mesh>
    )
  },
)

const springConfig = { mass: 5, friction: 50, tension: 120 }

type ImageCardBaseProps = Omit<JSX.IntrinsicElements['mesh'], 'scale'> & {
  /**
   * Size of the card
   */
  scale?: number | [x: number, y: number]

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

// TODO: remove material props
const DistortedImageCardBase = forwardRef(
  (
    {
      scale = 1,
      texture,
      noiseScale = 3,
      noiseSpeed = 0.5,
      zoom = 1,
      children,
      ...props
    }: ImageCardBaseProps,
    ref: ForwardedRef<Mesh>,
  ) => {
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

    const planeBounds: [x: number, y: number] = Array.isArray(scale)
      ? [scale[0], scale[1]]
      : [scale, scale]

    const imageBounds: [x: number, y: number] = [
      texture!.image.width,
      texture!.image.height,
    ]

    return (
      <ImageCardGeo
        ref={ref}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        scale={scale}
        {...props}
      >
        {/* @ts-ignore it's ok */}
        <AnimatedDistortedImageMaterial
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
        {children}
      </ImageCardGeo>
    )
  },
)

type ImageCardWithUrlProps = Omit<ImageCardBaseProps, 'texture'> & {
  url: string
}

const ImageCardWithUrl = forwardRef(
  ({ url, ...props }: ImageCardWithUrlProps, ref: ForwardedRef<Mesh>) => {
    const texture = useTexture(url)
    return <DistortedImageCardBase ref={ref} texture={texture} {...props} />
  },
)

type ImageCardProps = Omit<ImageCardBaseProps, 'texture'> & {
  /**
   *  Image url
   */
  url?: string

  /**
   * Image texture to display
   */
  texture?: Texture
}

export const DistortedImageCard = forwardRef(
  (props: ImageCardProps, ref: ForwardedRef<Mesh>) => {
    if (props.url) {
      return <ImageCardWithUrl ref={ref} url={props.url} {...props} />
    }
    if (props.texture) {
      return (
        <DistortedImageCardBase ref={ref} texture={props.texture} {...props} />
      )
    }
    throw Error('<ImageCard/> requires an URL or a texture')
  },
)
