import { Renderer } from './renderer.js'
import { Graphics } from '../graphics.js'
import { Vector2 } from '../vector2.js'
import { Color } from '../color.js'

export class Canvas2dRenderer extends Renderer {
	private initialized: boolean
	private ctx: CanvasRenderingContext2D

	constructor() {
		super(0.2)
		this.ctx = Graphics.canvas.getContext('2d') as CanvasRenderingContext2D
		if (!this.ctx) {
			this.initialized = false
			return
		}

		this.initialized = true
	}

	public override hasInitialized(): boolean {
		return this.initialized
	}

	public override beginFrame(): void {
		this.ctx.fillStyle = Graphics.clearColor.toHtmlString()
		this.ctx.fillRect(0, 0, Graphics.canvas.width, Graphics.canvas.height)
		this.ctx.lineWidth = Graphics.lineWidth
	}

	public override endFrame(): void {}

	public override drawLine(from: Vector2, to: Vector2, fromColor: Color, toColor: Color): void {
		const mapToCanvasWidth = (v: number): number => ((v + 1) / 2) * Graphics.canvas.width
		const mapToCanvasHeight = (v: number): number => Graphics.canvas.height - ((v + 1) / 2) * Graphics.canvas.height
		from.x = mapToCanvasWidth(from.x)
		from.y = mapToCanvasHeight(from.y)
		to.x = mapToCanvasWidth(to.x)
		to.y = mapToCanvasHeight(to.y)

		this.ctx.beginPath()

		/* 
		Gradient in this context is very slow, for now we will just use fromColor as the color.
		*/

		let gradient: CanvasGradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y)
		gradient.addColorStop(0, fromColor.toHtmlString())
		gradient.addColorStop(1, toColor.toHtmlString())

		this.ctx.strokeStyle = gradient
		this.ctx.lineWidth = Graphics.lineWidth
		this.ctx.moveTo(from.x, from.y)
		this.ctx.lineTo(to.x, to.y)
		this.ctx.closePath()
		this.ctx.stroke()
	}

	public override onResize(width: number, height: number): void {}
}
