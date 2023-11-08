import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { generateUUID } from 'three/src/math/MathUtils'
import { vertexShader } from './shaders/vertex'
import { fragmentShader } from './shaders/fragment'
import { animated } from '@react-spring/three'

/**
 * Image Material implementation
 *
 * Cover bg logic taken from https://github.dev/pmndrs/drei#image
 */
const DistortedImageMaterial = shaderMaterial(
  {
    uScale: [1, 1],
    uImageBounds: [1, 1],
    uZoom: 1,
    // distortion props
    uTime: 0,
    uNoiseStrength: 1,
    uNoiseSpeed: 0.5,
    uNoiseScale: 1,
    imageTexture: null,
  },
  vertexShader,
  fragmentShader,
)

DistortedImageMaterial.key = generateUUID()

extend({ DistortedImageMaterial })

export const AnimatedDistortedImageMaterial = animated('distortedImageMaterial')

export { DistortedImageMaterial }
