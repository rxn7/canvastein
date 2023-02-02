import { RandomHelper } from './randomHelper.js'

export namespace AudioHelper {
	const footstepSound: HTMLAudioElement = new Audio('audio/footstep.wav')

	export function playFootstep() {
		footstepSound.playbackRate = RandomHelper.randomFloat(0.5, 1.5)
		footstepSound.load()
		footstepSound.play()
	}
}
