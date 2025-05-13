import { useEffect, useRef, useState } from "react";

// @ts-expect-error shader files
import fragmentShader from "./fragment.glsl"
// @ts-expect-error shader files
import vertexShader from "./vertex.glsl"
import { type Mesh, type ShaderMaterial, Vector3 } from "three";
import { useCappedFrame } from "~/hooks/useCappedFrame";
import { SpringValue } from "@react-spring/web";

export default function Cube() {
	const [boxHover, setBoxHover] = useState(false);
	const meshRef = useRef<Mesh>(null);
	const shaderRef = useRef<ShaderMaterial>(null);
	const uTheme = new SpringValue(0)
	const uniforms = {
		uTime: {
			value: 0
		},
		uTheme: {
			value: 0
		}
	}

	useEffect(() => {
		const body = document.getElementsByTagName("body")[0]
		if (boxHover) {
			body.style.cursor = "pointer"
		} else {
			body.style.cursor = "default"
		}
	}, [boxHover])

	useCappedFrame(() => {
		meshRef.current.rotation.x += 0.025
		meshRef.current.rotation.y -= 0.025
		shaderRef.current.uniforms.uTime.value += 1
		shaderRef.current.uniforms.uTheme.value = uTheme.get()

		if (localStorage.getItem("nightwind-mode") === 'dark' && shaderRef.current.uniforms.uTheme.value < 1) {
			uTheme.start(1)
		} else if (localStorage.getItem("nightwind-mode") === 'light' && shaderRef.current.uniforms.uTheme.value > 0) {
			uTheme.start(0)
		}
	}, 30)

	return (
		<group>
			<mesh
				ref={meshRef}
				onPointerOver={() => setBoxHover(true)}
				onPointerOut={() => setBoxHover(false)}
			>
				<icosahedronGeometry args={[1, 1]} />
				<shaderMaterial ref={shaderRef} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
			</mesh>
		</group>
	)
}
