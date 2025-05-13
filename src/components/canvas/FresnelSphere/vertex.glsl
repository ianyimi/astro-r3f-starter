uniform float uTime;

varying vec3 vWorldPosition;
varying vec3 vPosition;
varying vec3 vWorldNormal;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	vPosition = position;
	vec4 worldPosition = modelMatrix * vec4(vPosition, 1.0);
	vWorldPosition = worldPosition.xyz;
	vWorldNormal = normalize(mat3(modelMatrix) * normal);
	vNormal = normal;
	vUv = uv;
	vUv -= 0.5;
	vUv *= 2.0;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
