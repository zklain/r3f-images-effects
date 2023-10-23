import { ShaderMaterial } from 'three'

export type DistortedImageMaterialType =
  JSX.IntrinsicElements['shaderMaterial'] & {
    map: THREE.Texture
    uScale?: number
    uSpeed?: number
    uNoiseStrength?: number
    uTime?: number
  }

export type DistortedImageMaterialRefType = ShaderMaterial &
  DistortedImageMaterialType

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortedImageMaterial: DistortedImageMaterialType
    }
  }
}
