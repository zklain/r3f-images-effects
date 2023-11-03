import { ThreeEvent } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { PropsWithChildren } from 'react'
import { Vector3 } from 'three'
import { selectedObject } from './state'

export const Focusable = ({
  children,
}: PropsWithChildren & { p?: Vector3; focus?: Vector3 }) => {
  const [selected, setSelected] = useAtom(selectedObject)

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (!selected) {
      setSelected(e.object.name)
    } else {
      setSelected(null)
    }
  }

  const onPointerMissed = (e: MouseEvent) => {
    e.stopPropagation()
    setSelected(null)
  }

  return (
    <group onClick={onClick} onPointerMissed={onPointerMissed}>
      {children}
    </group>
  )
}
