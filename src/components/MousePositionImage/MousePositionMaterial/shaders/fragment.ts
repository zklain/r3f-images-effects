import { snoise } from '@/utils/glsl'
import { REVISION } from 'three'

// TODO: use image shader utils
export const fragmentShader = /*glsl*/ `
  ${snoise}

   vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }


  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_scale;
  uniform float u_speed;
  uniform float u_strength;
  uniform sampler2D u_distortionMap;
  uniform sampler2D map;


  varying vec2 vUv;    

  void main() {

    vec2 a = aspect(u_scale);
    vec2 centeredUv = vUv * a;

    vec2 mouseCenter = u_mouse * a;

    vec2 scaledUv = centeredUv * 20. + u_time;

    // Generate shape under the cursor
    vec2 wavedUv = vec2(
      centeredUv.x + sin(scaledUv.x) * 0.03,
      centeredUv.y + sin(scaledUv.y) * 0.05
    );

    // distorted uvs => this can be replaced with a displacement texture
    float noise = snoise(vUv * 10.0 + u_time);

    vec2 distortedUv = vUv + noise;

    float s = smoothstep(0.01, 0.9, (0.02 / (distance(wavedUv, mouseCenter))));
    // multiply by effect strength
    s *= u_strength;

    // get final uv
    vec2 uv = mix(vUv, distortedUv, s);

    vec4 textureColor = texture2D(map, uv);

    // debug uv print
    gl_FragColor = vec4(textureColor.rgb, 1.0);

    #include <tonemapping_fragment>
    #include <${
      parseInt(REVISION.replace(/\D+/g, '')) >= 154
        ? 'colorspace_fragment'
        : 'encodings_fragment'
    }>
  }
`
