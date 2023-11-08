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
    u_mouse: Vector2
    u_time: number
    /**
     * Distortion texture
     */
    u_distortionMap?: Texture
    /**
     * Plane scale
     */
    u_scale: Vector2
    /**
     * Effect strength
     */
    u_strength: number
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
