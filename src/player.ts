import { Vector2 } from './vector2.js'
import { Canvastein } from './canvastein.js'
import { deg2Rad, lerp } from './helpers/mathHelper.js'
import { AudioHelper } from './helpers/audioHelper.js'

export class Player {
	public position: Vector2
	public yaw: number
	public pitch: number
	private headBob: Vector2 = Vector2.Zero()
	private headBobTimer: number = 0
	private headBobWasYPositive: boolean = false

	static headBobSpeed: number = 15
	static headBobVerticalAmplitude: number = 0.01
	static headBobHorizontalAmplitude: number = 0.005

	static moveSpeed: number = 2

	private input = {
		walkLeft: false,
		walkRight: false,
		walkForward: false,
		walkBackward: false,
		rotateLeft: false,
		rotateRight: false,
	}

	public getHeadOffset = (): Vector2 => this.headBob

	constructor(position: Vector2, yaw: number) {
		this.position = position
		this.yaw = yaw
		this.pitch = 0

		window.addEventListener('keypress', this.onKeyPress.bind(this))
		window.addEventListener('keyup', this.onKeyUp.bind(this))
		window.addEventListener('mousemove', this.onMouseMove.bind(this))
	}

	public update(canvastein: Canvastein, frameDelta: number) {
		const yawRad: number = deg2Rad(this.yaw)
		let moveDirection: Vector2 = Vector2.Zero()
		if (this.input.walkForward) {
			moveDirection.x += Math.cos(yawRad)
			moveDirection.y -= Math.sin(yawRad)
		}
		if (this.input.walkBackward) {
			moveDirection.x -= Math.cos(yawRad)
			moveDirection.y += Math.sin(yawRad)
		}
		if (this.input.walkLeft) {
			moveDirection.x += Math.cos(yawRad + Math.PI / 2)
			moveDirection.y -= Math.sin(yawRad + Math.PI / 2)
		}
		if (this.input.walkRight) {
			moveDirection.x -= Math.cos(yawRad + Math.PI / 2)
			moveDirection.y += Math.sin(yawRad + Math.PI / 2)
		}

		moveDirection = moveDirection.normalized().mul(frameDelta * Player.moveSpeed)
		this.calculateHeadBob(moveDirection, frameDelta)

		if (Math.floor(this.position.x + moveDirection.x) >= 0 && Math.floor(this.position.x + moveDirection.x) < canvastein.map[0].length) {
			if (canvastein.map[Math.floor(this.position.y)][Math.floor(this.position.x + moveDirection.x)] <= 0) {
				this.position.x += moveDirection.x
			}
		}

		if (Math.floor(this.position.y + moveDirection.y) >= 0 && Math.floor(this.position.y + moveDirection.y) < canvastein.map.length) {
			if (canvastein.map[Math.floor(this.position.y + moveDirection.y)][Math.floor(this.position.x)] <= 0) {
				this.position.y += moveDirection.y
			}
		}
	}

	private calculateHeadBob(moveDirection: Vector2, frameDelta: number): void {
		if (moveDirection.getLengthSqr() != 0) {
			this.headBobTimer += frameDelta
		} else {
			this.headBobTimer = 0
		}

		this.headBob.y = lerp(this.headBob.y, Math.cos(this.headBobTimer * Player.headBobSpeed) * Player.headBobVerticalAmplitude, 10 * frameDelta)
		this.headBob.x = lerp(this.headBob.x, Math.sin(this.headBobTimer * Player.headBobSpeed * 0.5) * Player.headBobHorizontalAmplitude, 10 * frameDelta)

		if (this.headBob.y < 0 && this.headBobWasYPositive) {
			AudioHelper.playFootstep()
		}

		this.headBobWasYPositive = this.headBob.y >= 0
	}

	private rotate(yaw: number, pitch: number) {
		this.yaw += yaw
		if (this.yaw < 0) this.yaw += 360
		if (this.yaw > 360) this.yaw -= 360

		this.pitch += pitch
		if (this.pitch > 90) this.pitch = 90
		else if (this.pitch < -90) this.pitch = -90
	}

	private onKeyPress(e: KeyboardEvent) {
		e.preventDefault()

		switch (e.key) {
			case 'w':
				this.input.walkForward = true
				break
			case 's':
				this.input.walkBackward = true
				break
			case 'a':
				this.input.walkLeft = true
				break
			case 'd':
				this.input.walkRight = true
				break
		}
	}

	private onKeyUp(e: KeyboardEvent) {
		e.preventDefault()

		switch (e.key) {
			case 'w':
				this.input.walkForward = false
				break
			case 's':
				this.input.walkBackward = false
				break
			case 'a':
				this.input.walkLeft = false
				break
			case 'd':
				this.input.walkRight = false
				break
		}
	}

	private onMouseMove(e: MouseEvent) {
		this.rotate(-e.movementX * 0.1, e.movementY * 0.1)
	}
}
