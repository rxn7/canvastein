import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { RenderingApi } from './rendering_api.js';
import { WebGLApi } from './webgl_api.js';
import { Canvas2dApi } from './canvas2d_api.js';

export let canvas: HTMLCanvasElement;
export const clearColor: Color = new Color(0,0,1);
export let lineWidth: number = 1;
export let api: RenderingApi;
export let apiType: RenderingApiType;
let guiCanvas: HTMLCanvasElement;
let guiCtx: CanvasRenderingContext2D;

export enum RenderingApiType {
	WebGL,
	Canvas2D
};

let halfHeight: number = 0;
let halfWidth: number = 0;

export function Init(_api: RenderingApiType) {
	apiType = _api;

	if(canvas) {
		canvas.remove(); // Delete the previous canvas if it exists
	}

	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);

	if(!guiCanvas) {
		guiCanvas = document.createElement('canvas');
		guiCanvas.id = 'gui-canvas';
		document.body.appendChild(guiCanvas);
		guiCtx = guiCanvas.getContext('2d') as CanvasRenderingContext2D;
	}

	switch(_api) {
		case RenderingApiType.WebGL:
			api = new WebGLApi();
			if(!api.HasInitialized()) {
				alert('Falling back to Canvas2D renderer. This renderer is experimental and may look different than the WebGL version.');
				api = new Canvas2dApi();
			}
			break;

		case RenderingApiType.Canvas2D:
			api = new Canvas2dApi();
			break;
	}

	if(!api.HasInitialized()){
		alert("Failed to initialize the rendering api!");
		return;
	}

	SetSize(window.innerWidth, window.innerHeight);
}

export function DrawLine(from: Vector2, to: Vector2, fromColor: Color, toColor: Color): void {
	api.DrawLine(from, to, fromColor, toColor);
}

export function DrawText(text: string, position: Vector2 = Vector2.Zero(), color: Color = new Color(0,0,0), align: CanvasTextAlign = 'left', baseLine: CanvasTextBaseline = 'top', fontSize: number = 50, font: string = 'monospace') {
	guiCtx.beginPath();
	guiCtx.textAlign = align;
	guiCtx.textBaseline = baseLine;
	guiCtx.font = `$${fontSize}px ${font}`;
	guiCtx.fillStyle = color.ToHtmlString();
	guiCtx.fillText(text, position.x, position.y);
	guiCtx.closePath();
}

export function ClearGui() {
	guiCtx.clearRect(0, 0, guiCanvas.width, guiCanvas.height);
}

export function BeginFrame(): void {
	api.BeginFrame();
}

export function EndFrame(): void {
	api.EndFrame();
}

export function SetSize(width: number = 1920, height: number = 1080): void {
	canvas.width = width;
	canvas.height = height;
	guiCanvas.width = width / 2;
	guiCanvas.height = height / 2;

	halfWidth = width / 2;
	halfHeight = height / 2;
	
	api.OnResize(width, height);
}

export function SetLineWidth(width: number) {
	lineWidth = width;
}

window.addEventListener('resize', () => {
	SetSize(window.innerWidth, window.innerHeight);
});

export function GetHalfWidth(): number { return halfWidth; }
export function GetHalfHeight(): number { return halfHeight; }
export function GetWidth(): number { return canvas.width; }
export function GetHeight(): number { return canvas.height; }
