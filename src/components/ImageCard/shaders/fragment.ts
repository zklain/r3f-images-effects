import { cnoise, imageUtils } from '@/utils/glsl'
import { version } from '@/utils/version'

export const fragmentShader = /*glsl*/ `
    ${cnoise}


    ${imageUtils}

    uniform vec2 uScale;
    uniform vec2 uImageBounds;
    uniform float uZoom;
    uniform float uTime;
    uniform float uNoiseSpeed;
    uniform float uNoiseScale;
    uniform float uNoiseStrength;
    uniform sampler2D imageTexture;

    varying vec2 vUv;
    

    void main() {

      // adjust uvs so that the image covers the plane
      vec2 adjustedUv = getCoverUv(vUv, uScale, uImageBounds);

      // apply zoom
      vec2 zUv = zoomUv(adjustedUv, uZoom);

      // scale uvs
      vec2 scaledUv = vUv * uNoiseScale;
      // scroll texture
      scaledUv += uTime * uNoiseSpeed;
      // get noise value
      float noiseVal = cnoise(scaledUv);

      // get final uv
      vec2 uv = zUv + noiseVal * uNoiseStrength;

      vec4 textureColor = texture2D(imageTexture, uv);
      gl_FragColor = vec4(textureColor.rgb, 1.);

      #include <tonemapping_fragment>
      #include <${
        version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'
      }>
  }
`
