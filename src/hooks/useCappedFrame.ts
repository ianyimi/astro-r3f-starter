import { type RootState, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function useCappedFrame(callback: (state: RootState) => void, framerate: number) {
	const prevFrame = useRef(0);
	useFrame((state) => {
		const frameDelta = state.clock.getElapsedTime() - prevFrame.current;
		if (frameDelta >= 1/framerate) {
			callback(state)
			prevFrame.current = state.clock.getElapsedTime()
		}
	})
}
