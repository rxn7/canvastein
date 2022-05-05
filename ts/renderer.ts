export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

export function DrawText(text: string, x: number = 0, y: number = 0, fontSize: number = 20, fontColor: string = 'white', align: CanvasTextAlign = 'left', baseLine: CanvasTextBaseline = 'top', font: string = 'monospace'): void {
	ctx.fillStyle = fontColor;
	ctx.font = `${fontSize}px ${font}`;
	ctx.textAlign = align;
	ctx.textBaseline = baseLine;
	ctx.fillText(text, x, y);
}

export function ClearCanvas(): void {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function UpdateCanvasSize(): void {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener('resize', UpdateCanvasSize);
