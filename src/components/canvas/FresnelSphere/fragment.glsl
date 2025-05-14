uniform float uTime;
uniform float uTheme;
uniform float uHover;
uniform vec3 args;

varying vec3 vWorldPosition;
varying vec3 vPosition;
varying vec3 vWorldNormal;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float invertedFresnel = dot(viewDirection, vWorldNormal);
    float fresnel = 1.0 - invertedFresnel;
    invertedFresnel = pow(invertedFresnel, 3.0);

    vec3 color = vec3(mix(fresnel, invertedFresnel, uTheme));
    vec3 hoverColor = vec3(1, 1, 0) * color;
    vec3 finalColor = mix(color, hoverColor, uHover);

    gl_FragColor = vec4(finalColor, 1);
}
