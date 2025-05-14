import { useEffect, useRef, useState } from "react";
import { type Mesh, type ShaderMaterial, Vector3 } from "three";
import { useCappedFrame } from "~/hooks/useCappedFrame";
import { SpringValue } from "@react-spring/web";

// @ts-expect-error shader files
import fragmentShader from "./fragment.glsl"
// @ts-expect-error shader files
import vertexShader from "./vertex.glsl"

export default function Cube() {
	const [boxHover, setBoxHover] = useState(false);
	const meshRef = useRef<Mesh>(null);
	const shaderRef = useRef<ShaderMaterial>(null);
	const uTheme = useRef(new SpringValue(0))
	const uHover = useRef(new SpringValue(0))
	const uniforms = useRef({
		uTime: {
			value: 0
		},
		uTheme: {
			value: 0
		},
		uHover: {
			value: 0
		}
	})

	useEffect(() => {
		const body = document.getElementsByTagName("body")[0]
		if (boxHover) {
			body.style.cursor = "pointer"
			if (uHover.current.get() < 1) {
				uHover.current.start({ to: 1 })
			}
		} else {
			body.style.cursor = "default"
			if (uHover.current.get() > 0) {
				uHover.current.start({ to: 0 })
			}
		}
	}, [boxHover])

	useCappedFrame(() => {
		meshRef.current.rotation.x += 0.025
		meshRef.current.rotation.y -= 0.025
		shaderRef.current.uniforms.uTime.value += 1
		shaderRef.current.uniforms.uTheme.value = uTheme.current.get()
		shaderRef.current.uniforms.uHover.value = uHover.current.get()

		if (localStorage.getItem("nightwind-mode") === 'dark' && shaderRef.current.uniforms.uTheme.value < 1) {
			uTheme.current.start({ to: 1 })
		} else if (localStorage.getItem("nightwind-mode") === 'light' && shaderRef.current.uniforms.uTheme.value > 0) {
			uTheme.current.start({ to: 0 })
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
				<shaderMaterial ref={shaderRef} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms.current} />
			</mesh>
		</group>
	)
}
