import { Rect } from './rect.js';

export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

export function DrawText(text: string, x: number = 0, y: number = 0, size: number = 20, color: string = 'white', font: string = 'monospace', strokeSize: number = 0, strokeColor: string = 'black', align: CanvasTextAlign = 'left', baseline: CanvasTextBaseline = 'top'): void {
	ctx.fillStyle = color;
	ctx.font = `${size}px ${font}`;
	ctx.textAlign = align;
	ctx.textBaseline = baseline;

	if(strokeSize != 0) {
		ctx.lineJoin = 'bevel';
		ctx.lineWidth = strokeSize;
		ctx.strokeStyle = strokeColor;
		ctx.strokeText(text, x, y);
	}

	ctx.fillText(text, x, y);
}

export function FillRect(rect: Rect, style: string): void {
	ctx.fillStyle = style;
	ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

export function Begin(): void {
	ctx.beginPath();
}

export function End(): void {
	ctx.closePath();
}

export function AddRect(rect: Rect): void {
	ctx.rect(rect.x, rect.y, rect.width, rect.height);
}

export function AddCircle(x: number, y: number, radius: number): void {
	ctx.arc(x, y, radius, 0, Math.PI * 2);
}

export function Fill(style: string): void {
	ctx.fillStyle = style;
	ctx.fill();
}

export function Stroke(style: string): void {
	ctx.strokeStyle = style;
	ctx.stroke();
}

export function BeginFrame(color: string = 'black'): void {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function SetCanvasSize(width: number = 1920, height: number = 1080): void {
	canvas.width = width;
	canvas.height = height;
}
