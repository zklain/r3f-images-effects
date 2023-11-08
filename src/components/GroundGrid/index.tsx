import { Grid } from '@react-three/drei'

export const GroundGrid = () => {
  return (
    <Grid
      position={[0, 0, 0]}
      args={[10.5, 10.5]}
      cellSize={0.5}
      cellThickness={1}
      cellColor="#a4a4a4"
      sectionSize={1}
      sectionThickness={1}
      sectionColor="#9e9e9e"
      fadeDistance={25}
      fadeStrength={1}
      infiniteGrid
    />
  )
}
