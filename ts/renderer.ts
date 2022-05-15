import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { RenderingApi } from './rendering_api.js';
import { WebGLApi } from './webgl_api.js';

export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let api: RenderingApi;
let apiType: RenderingApiType;

export enum RenderingApiType {
	WebGL,
	Canvas2D
};

let halfHeight: number = 0;
let halfWidth: number = 0;

export function Init(_api: RenderingApiType) {
	apiType = _api;

	switch(_api) {
		case RenderingApiType.WebGL:
			api = new WebGLApi();
			break;

		case RenderingApiType.Canvas2D:
			// api = new Canvas2DApi();
			break;
	}

	if(!api.HasInitialized()){
		alert("Failed to initialize the rendering api!");
		return;
	}
}

export function DrawLine(from: Vector2, to: Vector2, fromColor: Color, toColor: Color): void {
	api.DrawLine(from, to, fromColor, toColor);
}

export function BeginFrame(): void {
	api.BeginFrame();
}

export function EndFrame(): void {
	api.EndFrame();
}

export function SetCanvasSize(width: number = 1920, height: number = 1080): void {
	canvas.width = width;
	canvas.height = height;

	halfWidth = width / 2;
	halfHeight = height / 2;
	
	api.OnResize(width, height);
}

window.addEventListener('resize', () => {
	SetCanvasSize(window.innerWidth, window.innerHeight);
});

export function GetHalfWidth(): number { return halfWidth; }
export function GetHalfHeight(): number { return halfHeight; }
export function GetWidth(): number { return canvas.width; }
export function GetHeight(): number { return canvas.height; }
