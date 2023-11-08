import { snoise } from '@/utils/glsl'
import { version } from '@/utils/version'

// TODO: use image shader utils
export const fragmentShader = /*glsl*/ `
  ${snoise}

   vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }


  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uScale;
  uniform float uSpeed;
  uniform float uStrength;
  uniform sampler2D map;


  varying vec2 vUv;    

  void main() {

    vec2 a = aspect(uScale);
    vec2 centeredUv = vUv * a;

    vec2 mouseCenter = uMouse * a;

    vec2 scaledUv = centeredUv * 20. + uTime;

    // Generate shape under the cursor
    vec2 wavedUv = vec2(
      centeredUv.x + sin(scaledUv.x) * 0.03,
      centeredUv.y + sin(scaledUv.y) * 0.05
    );

    // distorted uvs => this can be replaced with a displacement texture
    float noise = snoise(vUv * 10.0 + uTime);

    vec2 distortedUv = vUv + noise;

    float s = smoothstep(0.01, 0.9, (0.02 / (distance(wavedUv, mouseCenter))));
    // multiply by effect strength
    s *= uStrength;

    // get final uv
    vec2 uv = mix(vUv, distortedUv, s);

    vec4 textureColor = texture2D(map, uv);

    // debug uv print
    gl_FragColor = vec4(textureColor.rgb, 1.0);

    #include <tonemapping_fragment>
    #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
  }
`
