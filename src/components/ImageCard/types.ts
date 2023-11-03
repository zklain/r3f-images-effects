import { ShaderMaterial } from 'three'

export type DistortedImageMaterialType =
  JSX.IntrinsicElements['shaderMaterial'] & {
    imageTexture: THREE.Texture
    uNoiseScale?: number
    uNoiseSpeed?: number
    uNoiseStrength?: number
    uTime?: number
    uScale: [number, number]
    uZoom?: number
    uImageBounds: [number, number]
  }

export type RoundedPlaneGeometryType = Omit<
  JSX.IntrinsicElements['bufferGeometry'],
  'args'
> & {
  args: [x: number, y: number, r: number]
}

export type DistortedImageMaterialRefType = ShaderMaterial &
  DistortedImageMaterialType

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortedImageMaterial: DistortedImageMaterialType
      roundedPlaneGeometry: RoundedPlaneGeometryType
    }
  }
}
