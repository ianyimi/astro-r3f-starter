'use client'

import { AdaptiveDpr, Bvh, Preload, Box, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { extend } from "@react-three/fiber"
import { useEffect, useState } from 'react'

extend(THREE as any)

const defaultCanvasProps = {
  gl: {
    // powerPreference: 'high-performance',
    antialias: true,
    depth: true,
    // alpha: false,
    stencil: false,
  },
  camera: {
    near: 0.01,
    far: 100,
    fov: 75,
    zoom: isMobile ? 0.75 : 1,
    // makeDefault: true,
    position: new Vector3(0, 0, 5),
    // quaternion: quaternion,
  },
  resize: { polyfill: ResizeObserver },
  dpr: window.devicePixelRatio,
  // events: undefined,
}

export default function Scene() {
	const [boxHover, setBoxHover] = useState();
	useEffect(() => {
		const body = document.getElementsByTagName("body")[0]
		if (boxHover) {
			body.style.cursor = "pointer"
		} else {
			body.style.cursor = "default"
		}
	}, [boxHover])
  // Everything defined in here will persist between route changes, only children are swapped
  const content = document.getElementById('content')
  return (
    <Canvas
      id='canvas'
      dpr={window.devicePixelRatio}
      {...defaultCanvasProps}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        overflow: 'hidden',
      }}
      eventSource={content}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
      eventPrefix='client'
      flat
    >
      <Bvh>
        <AdaptiveDpr />
        <Preload all />
        <OrbitControls />
				{/* @ts-expect-error */}
        <Box args={[1, 1, 1]} onClick={() => console.log('clicked box')} onPointerOver={() => setBoxHover(true)} onPointerOut={() => setBoxHover(false)}><meshBasicMaterial color={boxHover ? 'yellow' : 'hotpink'} /></Box>
      </Bvh>
      {/* @ts-ignore */}

      <Preload all />
    </Canvas>
  )
}
