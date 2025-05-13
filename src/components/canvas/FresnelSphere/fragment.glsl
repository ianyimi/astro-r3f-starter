uniform float uTime;
uniform vec3 args;

varying vec3 vWorldPosition;
varying vec3 vPosition;
varying vec3 vWorldNormal;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	vec2 uv = vUv;

	vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
	float fresnel = dot(viewDirection, vWorldNormal);
	fresnel = pow(fresnel, 3.0);

	gl_FragColor = vec4(vec3(fresnel), 1);
}
