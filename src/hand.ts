import Clock from './clock.js'
import { deg2rad } from './helpers/mathHelper.js'

export default class Hand {
	public length: number
	public width: number
	public color: string
	public angle: number = 0
	private clock: Clock

	constructor(clock: Clock, length: number = 10, width: number = 2, color: string = '#fff') {
		this.length = length
		this.width = width
		this.color = color
		this.clock = clock
	}

	public render(ctx: CanvasRenderingContext2D): void {
		const centerX: number = ctx.canvas.width * 0.5
		const centerY: number = ctx.canvas.height * 0.5
		const width: number = this.width * this.clock.getScale()
		const length: number = this.length * this.clock.getScale()
		const angle: number = this.angle - deg2rad(90)
		ctx.beginPath()
		ctx.strokeStyle = this.color
		ctx.lineWidth = width
		ctx.moveTo(centerX, centerY)
		ctx.lineTo(centerX + Math.cos(angle) * length, centerY + Math.sin(angle) * length)
		ctx.stroke()
	}
}
