import { Grid } from '@react-three/drei'

export const GroundGrid = () => {
  return (
    <Grid
      position={[0, -0.81, 0]}
      args={[10.5, 10.5]}
      cellSize={0.5}
      cellThickness={1}
      cellColor="#808080"
      sectionSize={1}
      sectionThickness={1}
      sectionColor="#808080"
      fadeDistance={25}
      fadeStrength={1}
      infiniteGrid
    />
  )
}
