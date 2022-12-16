import { Vector2 } from './vector2.js'
import { Color } from './color.js'
import { Renderer } from './renderers/renderer.js'
import { WebGLRenderer } from './renderers/webgl_renderer.js'
import { Canvas2dRenderer } from './renderers/canvas2d_renderer.js'
import { Player } from './player.js'

export namespace Graphics {
	export enum RendererType {
		WebGL,
		Canvas2D,
	}

	export let canvas: HTMLCanvasElement
	export const clearColor: Color = new Color(0.43, 0.5, 0.87)
	export let lineWidth: number = 1
	export let rendererEnum: RendererType
	export let guiCanvas: HTMLCanvasElement
	export let halfHeight: number = 0
	export let halfWidth: number = 0
	export let scaleRatio: number
	export let guiEnabled: boolean = true
	export let renderer: Renderer
	let guiCtx: CanvasRenderingContext2D
	const canvasContainer: HTMLDivElement = document.getElementById('canvas-container') as HTMLDivElement

	export function init(rendererType: RendererType) {
		if (canvas) canvas.remove()

		canvas = document.createElement('canvas')
		canvasContainer.appendChild(canvas)

		if (!guiCanvas) {
			guiCanvas = document.createElement('canvas')
			guiCanvas.id = 'gui-canvas'
			canvasContainer.appendChild(guiCanvas)
			guiCtx = guiCanvas.getContext('2d') as CanvasRenderingContext2D
		}

		switch (rendererType) {
			case RendererType.WebGL:
				renderer = new WebGLRenderer()
				rendererEnum = RendererType.WebGL
				if (!renderer.hasInitialized()) {
					alert('Falling back to Canvas2D renderer. This renderer is experimental and may look different than the WebGL version.')
					renderer = new Canvas2dRenderer()
					rendererEnum = RendererType.Canvas2D
				}
				break

			case RendererType.Canvas2D:
				renderer = new Canvas2dRenderer()
				rendererEnum = RendererType.Canvas2D
				break
		}

		setSize(window.innerWidth, (window.innerWidth * 9) / 16)
	}

	export function drawLine(from: Vector2, to: Vector2, fromColor: Color, toColor: Color): void {
		renderer.drawLine(from, to, fromColor, toColor)
	}

	export function drawGuiLine(from: Vector2, to: Vector2, width: number, color: Color) {
		width *= scaleRatio
		guiCtx.beginPath()
		guiCtx.moveTo(from.x, from.y)
		guiCtx.lineTo(to.x, to.y)
		guiCtx.strokeStyle = color.toHtmlString()
		guiCtx.lineWidth = width
		guiCtx.stroke()
		guiCtx.closePath()
	}

	export function drawGuiText(text: string, position: Vector2 = Vector2.Zero(), color: Color = new Color(0, 0, 0), align: CanvasTextAlign = 'left', baseLine: CanvasTextBaseline = 'top', fontSize: number = 50, font: string = 'monospace') {
		fontSize *= scaleRatio
		position.y *= scaleRatio
		guiCtx.beginPath()
		guiCtx.textAlign = align
		guiCtx.textBaseline = baseLine
		guiCtx.font = `${fontSize}px ${font}`
		guiCtx.fillStyle = color.toHtmlString()
		guiCtx.fillText(text, position.x, position.y)
		guiCtx.closePath()
	}

	export function clearGui() {
		guiCtx.clearRect(0, 0, guiCanvas.width, guiCanvas.height)
	}

	export function beginFrame(player: Player): void {
		guiCanvas.style.visibility = guiEnabled ? 'visible' : 'hidden'

		scaleRatio = guiCanvas.width / 1920
		renderer.beginFrame(player)
	}

	export function endFrame(): void {
		renderer.endFrame()
	}

	export function setSize(width: number = 1920, height: number = 1080): void {
		canvas.width = width
		canvas.height = height
		guiCanvas.width = width
		guiCanvas.height = height

		halfWidth = width / 2
		halfHeight = height / 2

		renderer.onResize(width, height)
	}

	export function setLineWidth(width: number) {
		lineWidth = width
	}

	export function setGuiEnabled(v: boolean) {
		guiEnabled = v
	}

	window.addEventListener('resize', () => {
		setSize(window.innerWidth, (window.innerWidth * 9) / 16)
	})
}
