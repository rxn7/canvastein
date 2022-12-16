import * as Graphics from './graphics.js'
import * as Maths from './helpers/mathHelper.js'
import { Player } from './player.js'
import { Vector2 } from './vector2.js'
import { Color } from './color.js'

const floorColorFrom: Color = new Color(0.4, 0.4, 0.4)
const floorColorTo: Color = new Color(0.2, 0.2, 0.2)
const wallColorFrom: Color = new Color(0.8, 0.8, 0.8)
const wallColorTo: Color = new Color(0.6, 0.6, 0.6)

export class Canvastein {
	private player: Player
	private lastTimeStamp: DOMHighResTimeStamp
	private frameDelta: number
	private changeApi: boolean = false
	private fovMultiplier: number = 1.6
	private fogNear: number = 8
	private fogFar: number = 15
	private fogEnabled: boolean = true

	public map: Array<Array<number>> = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 1, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 1, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, -1, 0, 0, 0, 0, 0, 1, 1],
		[1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]

	constructor() {
		// Use Canvas2D renderer on mobile devices
		if (/Android|webOS|iPhone|iPad|iPod|BLACKBerry/i.test(navigator.userAgent) || /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)) {
			Graphics.init(Graphics.RendererType.Canvas2D)
		} else {
			Graphics.init(Graphics.RendererType.WebGL)
		}

		Graphics.guiCanvas.addEventListener('click', () => Graphics.canvas.requestPointerLock())
		let playerStartPosition: Vector2 = new Vector2(1, 1)
		for (let y: number = 0; y < this.map.length; ++y) {
			for (let x: number = 0; x < this.map[0].length; ++x) {
				if (this.map[y][x] == -1) {
					playerStartPosition.x = x
					playerStartPosition.y = y
				}
			}
		}

		this.player = new Player(playerStartPosition, 90)
		this.frameDelta = 0
		this.lastTimeStamp = 0

		window.addEventListener('keypress', (event: KeyboardEvent) => {
			switch (event.key) {
				case 'p':
					this.changeApi = true
					break

				case 'o':
					Graphics.setGuiEnabled(!Graphics.guiEnabled)
					break

				case 'i':
					this.fogEnabled = !this.fogEnabled
					break
			}
		})
	}

	public async run() {
		this.startUpdateGuiTask()
		window.requestAnimationFrame(this.gameLoop.bind(this))
	}

	private async startUpdateGuiTask() {
		while (true) {
			await new Promise(resolve => setTimeout(resolve, 200))
			Graphics.clearGui()
			Graphics.drawGuiText(`FPS: ${Math.round(1 / this.frameDelta)}`)
			Graphics.drawGuiText(`Renderer: ${Graphics.RendererType[Graphics.rendererEnum]}`, new Vector2(0, 60))
			Graphics.drawGuiText(`Fog: ${this.fogEnabled}`, new Vector2(0, 120))

			Graphics.drawGuiText("Press 'P' to change renderer", new Vector2(Graphics.canvas.width, 0), Color.Black(), 'right')
			Graphics.drawGuiText("Press 'O' to toggle GUI", new Vector2(Graphics.canvas.width, 60), Color.Black(), 'right')
			Graphics.drawGuiText("Press 'I' to toggle fog", new Vector2(Graphics.canvas.width, 120), Color.Black(), 'right')
			this.drawCrosshar()
		}
	}

	private gameLoop(now: DOMHighResTimeStamp): void {
		this.frameDelta = this.lastTimeStamp != 0 ? (now - this.lastTimeStamp) / 1000 : 1 / 60
		if (this.changeApi) {
			if (Graphics.rendererEnum == Graphics.RendererType.Canvas2D) {
				Graphics.init(Graphics.RendererType.WebGL)
			} else {
				Graphics.init(Graphics.RendererType.Canvas2D)
			}
			this.changeApi = false
		}

		this.player.update(this, this.frameDelta)

		Graphics.beginFrame(this.player)
		this.drawWorld()
		Graphics.endFrame()

		this.lastTimeStamp = now
		window.requestAnimationFrame(this.gameLoop.bind(this))
	}

	private drawCrosshar(): void {
		const color: Color = Color.Black()
		const distanceFromMiddle: number = 20 * Graphics.scaleRatio
		Graphics.drawGuiLine(new Vector2(Graphics.halfWidth - distanceFromMiddle, Graphics.halfHeight), new Vector2(Graphics.halfWidth + distanceFromMiddle, Graphics.halfHeight), 5, color)
		Graphics.drawGuiLine(new Vector2(Graphics.halfWidth, Graphics.halfHeight - distanceFromMiddle), new Vector2(Graphics.halfWidth, Graphics.halfHeight + distanceFromMiddle), 5, color)
	}

	private drawWorld(): void {
		let rayCount: number = Graphics.canvas.width
		if (Graphics.rendererEnum == Graphics.RendererType.Canvas2D) rayCount *= 0.1 // Lower the quality if using Canvas2D renderer. Canvas2D renderer can't handle rendering that much lines.
		const forwardDirection: Vector2 = new Vector2(Math.cos(Maths.deg2Rad(this.player.yaw)), -Math.sin(Maths.deg2Rad(this.player.yaw)))
		const rightDirection: Vector2 = new Vector2(-forwardDirection.y, forwardDirection.x)
		let rayPosition: Vector2 = this.player.position.copy()
		const playerPitch: number = Maths.deg2Rad(this.player.pitch) * 2

		Graphics.setLineWidth(Graphics.canvas.width / rayCount + 2)
		for (let rayIndex: number = 0; rayIndex < rayCount; rayIndex++) {
			const interpolationCoefficient = (2.0 * rayIndex) / rayCount - 1.0
			const rayDirection: Vector2 = new Vector2(forwardDirection.x + interpolationCoefficient * this.fovMultiplier * rightDirection.x, forwardDirection.y + interpolationCoefficient * this.fovMultiplier * rightDirection.y)
			const mapPosition: Vector2 = new Vector2(Math.floor(rayPosition.x), Math.floor(rayPosition.y))
			let deltaDist: Vector2 = new Vector2()
			let sideDist: Vector2 = new Vector2()
			let step: Vector2 = new Vector2()
			let side = 0 // 0 - horizontal, 1 - vertical

			if (Math.abs(rayDirection.x) < 1e-8) deltaDist.x = 1e8
			else deltaDist.x = Math.abs(1 / rayDirection.x)

			if (Math.abs(rayDirection.y) < 1e-8) deltaDist.y = 1e8
			else deltaDist.y = Math.abs(1 / rayDirection.y)

			if (rayDirection.x < 0) {
				// Left
				step.x = -1
				sideDist.x = (rayPosition.x - mapPosition.x) * deltaDist.x
			} else {
				// Right
				step.x = 1
				sideDist.x = (mapPosition.x + 1 - rayPosition.x) * deltaDist.x
			}

			if (rayDirection.y < 0) {
				// Down
				step.y = -1
				sideDist.y = (rayPosition.y - mapPosition.y) * deltaDist.y
			} else {
				// Up
				step.y = 1
				sideDist.y = (mapPosition.y + 1 - rayPosition.y) * deltaDist.y
			}

			let hit: number = 0
			while (hit <= 0) {
				if (sideDist.x < sideDist.y) {
					sideDist.x += deltaDist.x
					mapPosition.x += step.x
					side = 0
				} else {
					sideDist.y += deltaDist.y
					mapPosition.y += step.y
					side = 1
				}

				hit = this.map[mapPosition.y][mapPosition.x]
			}

			if (hit > 0) {
				let wallDistance: number = 0
				if (side == 0) wallDistance = Math.abs(sideDist.x - deltaDist.x)
				else wallDistance = Math.abs(sideDist.y - deltaDist.y)

				let wallHeight: number = 0.5 / wallDistance
				const fogFactor: number = 1 - (this.fogFar - wallDistance) / (this.fogFar - this.fogNear)

				let wallColorFromFinal: Color = wallColorFrom
				let wallColorToFinal: Color = wallColorTo

				// Make the vertical walls darker - fake shadows
				if (side == 1) {
					wallColorFromFinal = wallColorFromFinal.mul(0.9)
					wallColorToFinal = wallColorToFinal.mul(0.9)
				}

				if (this.fogEnabled) {
					wallColorFromFinal = wallColorFromFinal.mix(Graphics.clearColor, fogFactor)
					wallColorToFinal = wallColorToFinal.mix(Graphics.clearColor, fogFactor)
				}

				if (wallDistance < this.fogFar) {
					// Render the wall only if it's visible
					Graphics.drawLine(new Vector2(interpolationCoefficient, wallHeight + playerPitch), new Vector2(interpolationCoefficient, -wallHeight + playerPitch), wallColorFromFinal, wallColorToFinal)
				}

				Graphics.drawLine(new Vector2(interpolationCoefficient, -1), new Vector2(interpolationCoefficient, -wallHeight + playerPitch), floorColorFrom, floorColorTo)
			}
		}
	}
}
