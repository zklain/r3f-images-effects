import { ShaderMaterial, Texture, Vector2 } from 'three'

export type MousePositionMaterialType =
  JSX.IntrinsicElements['shaderMaterial'] & {
    /**
     * Texture
     */
    map?: THREE.Texture
    /**
     * Mouse position
     */
    uMouse: Vector2
    uTime: number

    /**
     * Plane scale
     */
    uScale: Vector2
    /**
     * Effect strength
     */
    uStrength: number
  }

export type MousePositionMaterialRefType = ShaderMaterial &
  MousePositionMaterialType

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mousePositionMaterial: MousePositionMaterialType
    }
  }
}
