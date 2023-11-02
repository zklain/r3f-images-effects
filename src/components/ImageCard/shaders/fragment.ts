import { cnoise } from '../../../utils/noise.shader'
import { version } from '../../../utils/version'

export const fragmentShader = /*glsl*/ `
    ${cnoise}

    uniform float uTime;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uNoiseStrength;
    uniform sampler2D map;

    varying vec2 vUv;    

    void main() {

        // scale uvs
        vec2 scaledUv = vUv * uScale;

        // scroll texture
        scaledUv += uTime * uSpeed;

        float noiseVal = cnoise(scaledUv);

        vec2 uv = vUv + noiseVal * uNoiseStrength;

        vec4 textureColor = texture2D(map, uv);
        gl_FragColor = vec4(textureColor.rgb, 1.);

        #include <tonemapping_fragment>
        #include <${
          version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'
        }>
    }
`
