import { DistortedImageScene } from '@/scenes/DistortedImage'
import { MouseHoverImage } from '@/scenes/MouseHoverImage'

export const routes = [
  {
    name: 'Distorted Image',
    path: 'distorted-image',
    element: <DistortedImageScene />,
  },
  { name: 'Image Hover', path: 'hover-image', element: <MouseHoverImage /> },
]
