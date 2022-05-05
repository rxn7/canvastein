import * as Renderer from './renderer.js'
import { Rect } from './rect.js';

const SUBSCREEN_ASPECT_RATIO = 3 / 2;

let lastTimeStamp: DOMHighResTimeStamp;
let subScreenRect: Rect = new Rect();

function GameLoop(timeStamp: DOMHighResTimeStamp) {
	const deltaTime: number = (timeStamp - lastTimeStamp) / 1000;

	Renderer.ClearCanvas();
	Renderer.DrawRect(subScreenRect, 'black');
	Renderer.DrawText(`FPS: ${Math.round(1/deltaTime)}`, 5, 5, 40, 'white', 'monospace', 5, 'black');

	lastTimeStamp = timeStamp;
	window.requestAnimationFrame(GameLoop);
}

function CalculateSubScreenSize() {
	const proportionWidth: number = Renderer.canvas.height * SUBSCREEN_ASPECT_RATIO;

	if(proportionWidth < Renderer.canvas.width) {
		subScreenRect.width = proportionWidth;
		subScreenRect.x = Renderer.canvas.width / 2 - subScreenRect.width / 2;
	} else {
		subScreenRect.width = Renderer.canvas.width;
		subScreenRect.x = 0;
	}

	subScreenRect.height = subScreenRect.width / SUBSCREEN_ASPECT_RATIO;
	subScreenRect.y = Renderer.canvas.height / 2 - subScreenRect.height / 2;
}

function OnResize() {
	Renderer.UpdateCanvasSize();
	CalculateSubScreenSize();
}

window.addEventListener('resize', OnResize);

window.addEventListener('load', () => {
	OnResize();
	window.requestAnimationFrame(GameLoop);
});
