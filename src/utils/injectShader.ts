import type { WebGLProgramParametersWithUniforms, Material } from "three"

type ShaderInjection = {
	material: Material,
	shader: WebGLProgramParametersWithUniforms,
	uniforms?: Record<string, Record<"value", unknown>>
	fragmentShader: string,
	vDisplacementMap?: string,
}

export function injectShaders({ material, shader, uniforms, fragmentShader, vDisplacementMap }: ShaderInjection) {
	material.userData.shader = shader;

	const mainFragmentString = `#include <normal_fragment_maps>`
	shader.fragmentShader.replace(
		mainFragmentString,
		`${mainFragmentString} ${fragmentShader}`
	)

	if (uniforms) {
		for (const [key, value] of Object.entries(uniforms)) {
			shader.uniforms[key] = value
		}
	}

	const mainDisplacementString = `#include <displacementmap_vertex>`
	if (vDisplacementMap) {
		shader.fragmentShader.replace(
			mainDisplacementString,
			`${mainDisplacementString} ${vDisplacementMap}`
		)
	}
}
