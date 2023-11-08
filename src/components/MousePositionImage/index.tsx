import { GOLDEN_RATIO } from '@/utils/consts'
import { useSpring } from '@react-spring/three'
import { useCursor } from '@react-three/drei'
import { ThreeEvent, Vector3, useFrame } from '@react-three/fiber'
import { useCallback, useRef, useState } from 'react'
import { Mesh, Texture, Vector2 } from 'three'
import { ImageCardGeo } from '../DistortedImageCard'
import {
  AnimatedMousePositionMaterial,
  MousePositionMaterial,
} from './MousePositionMaterial'
import { MousePositionMaterialRefType } from './MousePositionMaterial/types'

export const MousePositionDistortedImage = ({
  position,
  scale,
  name,
  texture,
}: {
  position?: Vector3
  texture: Texture
  scale?: number | [x: number, y: number]
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
    material.current.u_time = state.clock.getElapsedTime()
    material.current.u_mouse.copy(mousePosition.current)
  })

  return (
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
        // TODO: image props
        u_scale={new Vector2(1, GOLDEN_RATIO)}
        key={MousePositionMaterial.key}
        u_time={0}
        u_mouse={mousePosition.current}
        // u_distortionMap={distortionMap}
        {...springs}
      />
    </ImageCardGeo>
  )
}
