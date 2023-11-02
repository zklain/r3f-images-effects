import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { generateUUID } from 'three/src/math/MathUtils'
import { vertexShader } from './shaders/vertex'
import { fragmentShader } from './shaders/fragment'
import { animated } from '@react-spring/three'

// TODO: extend https://github.dev/pmndrs/drei#image
// TODO: add max noise

const DistortedImageMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseStrength: 1,
    uSpeed: 0.5,
    uScale: 1,
    map: null,
  },
  vertexShader,
  fragmentShader,
)

DistortedImageMaterial.key = generateUUID()

extend({ DistortedImageMaterial })

export const AnimatedImageMaterial = animated('distortedImageMaterial')

export { DistortedImageMaterial }
