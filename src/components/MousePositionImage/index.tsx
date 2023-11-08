import { GOLDEN_RATIO } from '@/utils/consts'
import { useSpring } from '@react-spring/three'
import { Html, useCursor } from '@react-three/drei'
import { ThreeEvent, Vector3, useFrame } from '@react-three/fiber'
import { useCallback, useRef, useState } from 'react'
import { Mesh, Texture, Vector2 } from 'three'
import { ImageCardGeo } from '../DistortedImageCard'
import {
  AnimatedMousePositionMaterial,
  MousePositionMaterial,
} from './MousePositionMaterial'
import { MousePositionMaterialRefType } from './MousePositionMaterial/types'
import { useControls } from 'leva'

export const MousePositionDistortedImage = ({
  position,
  scale,
  name,
  texture,
}: {
  position?: Vector3
  texture: Texture
  scale: number | [x: number, y: number]
  name?: string
}) => {
  const mesh = useRef<Mesh>(null!)
  const material = useRef<MousePositionMaterialRefType>(null!)
  const mousePosition = useRef(new Vector2(0, 0))

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const [springs, api] = useSpring(() => ({
    u_strength: 0,
    clamp: true,
  }))

  const onPointerOver = useCallback(() => {
    setHovered(true)
    api.start({
      u_strength: 1,
      config: { mass: 5, friction: 50, tension: 120 },
    })
  }, [setHovered])

  const onPointerOut = useCallback(() => {
    setHovered(false)
    api.start({
      u_strength: 0,
      config: { mass: 5, friction: 50, tension: 120 },
    })
  }, [setHovered])

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (e.uv) {
      mousePosition.current.set(e.uv.x, e.uv.y)
    } else {
      console.error('NO UV 😭')
    }
  }, [])

  useFrame((state) => {
    material.current.uTime = state.clock.getElapsedTime()
    material.current.uMouse.copy(mousePosition.current)
  })

  return (
    <>
      <ImageCardGeo
        ref={mesh}
        scale={scale}
        name={name}
        position={position}
        onPointerOver={onPointerOver}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
      >
        {/* @ts-ignore don't worry */}
        <AnimatedMousePositionMaterial
          ref={material}
          map={texture}
          uScale={
            Array.isArray(scale)
              ? new Vector2(scale[0], scale[1])
              : new Vector2(scale, scale)
          }
          key={MousePositionMaterial.key}
          uTime={0}
          {...springs}
        />
      </ImageCardGeo>
    </>
  )
}
