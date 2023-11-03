export const imageUtils = /* glsl */ `
    vec2 zoomUv(vec2 uv, float zoom) {
        vec2 center = vec2(0.5, 0.5);
        vec2 new = uv - center;
        new = new / zoom;
        new = new + center;
        return new;
    }

    vec2 aspect(vec2 size){
        return size / min(size.x, size.y);
    }


    vec2 getCoverUv(vec2 uv, vec2 screenScale, vec2 imageResolution) {
        vec2 s = aspect(screenScale);
        vec2 i = aspect(imageResolution);

        float rs = s.x / s.y;
        float ri = i.x / i.y;

        vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
        vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
        vec2 adjustedUv = uv * s / new + offset;
        return adjustedUv;
    }
`
