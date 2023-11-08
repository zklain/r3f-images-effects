import { Text } from '@react-three/drei'
import { MeshProps } from '@react-three/fiber'
import { PropsWithChildren } from 'react'

export const TitleText = ({
  children,
  ...props
}: PropsWithChildren &
  MeshProps & {
    maxWidth?: number
  }) => (
  <Text
    color="#5c5c5c"
    position={[-1.75, 0.001, 0.25]}
    rotation={[-Math.PI / 2, 0, 0]}
    fontSize={0.5}
    anchorX={'left'}
    anchorY={'top'}
    {...props}
  >
    {children}
  </Text>
)

export const DescriptionText = ({
  children,
  ...props
}: PropsWithChildren & MeshProps) => (
  <Text
    rotation={[-Math.PI / 2, 0, 0]}
    position={[0, 0.001, 1.01]}
    fontSize={0.1}
    color="#5c5c5c"
    maxWidth={2}
    anchorX={'left'}
    anchorY={'top'}
    {...props}
  >
    {children}
  </Text>
)
