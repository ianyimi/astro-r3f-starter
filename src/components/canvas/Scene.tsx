'use client'

import { AdaptiveDpr, Bvh, Preload, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { extend } from "@react-three/fiber"
import FresnelSphere from "./FresnelSphere"

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
      </Bvh>
			<FresnelSphere />
			<ambientLight intensity={1} />
      <Preload all />
    </Canvas>
  )
}
