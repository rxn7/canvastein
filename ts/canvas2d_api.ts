import { RenderingApi } from './rendering_api.js';
import { canvas, lineWidth, clearColor } from './renderer.js';
import { Vector2 } from './vector2.js';
import { Color } from './color.js';

export class Canvas2dApi extends RenderingApi {
	private initialized: boolean;
	private ctx: CanvasRenderingContext2D;

	constructor() {
		super();
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;;
		if(!this.ctx) {
			this.initialized = false;
			return;
		}

		this.initialized = true;
	}

	public HasInitialized(): boolean {
		return this.initialized 
	}

	public BeginFrame(): void {
		this.ctx.fillStyle = clearColor.ToHtmlString();
		this.ctx.fillRect(0, 0, canvas.width,canvas.height);
		this.ctx.lineWidth = lineWidth;
	}

	public EndFrame(): void {
	}

	public DrawLine(from: Vector2, to: Vector2, fromColor: Color, _toColor: Color): void {
		const mapToCanvasWidth = (v: number): number => (v + 1) / 2 * canvas.width;
		const mapToCanvasHeight = (v: number): number => canvas.height - ((v + 1) / 2 * canvas.height);
		from.x = mapToCanvasWidth(from.x);
		from.y = mapToCanvasHeight(from.y);
		to.x = mapToCanvasWidth(to.x);
		to.y = mapToCanvasHeight(to.y);

		this.ctx.beginPath();
		/* 
		Gradient in this context is very slow, for now we will just use fromColor as the color.

		let gradient: CanvasGradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
		gradient.addColorStop(0, fromColor.ToHtmlString());
		gradient.addColorStop(1, toColor.ToHtmlString());
		*/
		this.ctx.strokeStyle = fromColor.ToHtmlString();
		this.ctx.lineWidth = lineWidth;
		this.ctx.moveTo(from.x, from.y);
		this.ctx.lineTo(to.x, to.y);
		this.ctx.closePath();
		this.ctx.stroke();
	}

	public OnResize(_width: number, _height: number): void {
	}
}
