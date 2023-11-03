import { CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Object3D, Vector3 } from 'three'
import { selectedObject } from './state'

export const INITIAL_CAMERA_POSITION: [x: number, y: number, z: number] = [
  5, 5, 5,
]

export const CameraRig = ({
  initialCameraPosition = INITIAL_CAMERA_POSITION,
  p = new Vector3(...INITIAL_CAMERA_POSITION),
  focus = new Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree()
  const cameraControls = controls as unknown as CameraControls

  const [selected] = useAtom(selectedObject)

  const focusCamera = (obj: Object3D) => {
    obj.updateWorldMatrix(true, true)
    obj.localToWorld(p.set(0, 0, 3))
    obj.localToWorld(focus.set(0, 0, 0))
    cameraControls?.setLookAt(...p.toArray(), ...focus.toArray(), true)
  }
  const resetCamera = () => {
    p.set(...initialCameraPosition)
    focus.set(0, 0, 0)
    cameraControls?.setLookAt(...p.toArray(), ...focus.toArray(), true)
  }

  useEffect(() => {
    if (selected) {
      const obj = scene.getObjectByName(selected) as Object3D
      obj && focusCamera(obj)
    } else {
      resetCamera()
    }
  }, [selected])

  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  )
}
