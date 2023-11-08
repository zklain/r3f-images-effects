import { shaderMaterial } from '@react-three/drei'
import { vertexShader } from './shaders/vertex'
import { fragmentShader } from './shaders/fragment'
import { extend } from '@react-three/fiber'
import { Vector2 } from 'three'
import { animated } from '@react-spring/three'
import { GOLDEN_RATIO } from '@/utils/consts'

export const MousePositionMaterial = shaderMaterial(
  {
    u_mouse: new Vector2(0.5),
    u_time: 0,
    u_scale: new Vector2(1, GOLDEN_RATIO),
    color: null,
    u_distortionMap: null,
    u_strength: 0,
    map: null,
  },
  vertexShader,
  fragmentShader,
)

extend({ MousePositionMaterial })

export const AnimatedMousePositionMaterial = animated('mousePositionMaterial')
