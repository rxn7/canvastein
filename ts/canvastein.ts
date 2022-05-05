import * as Renderer from './renderer.js'
import { Rect } from './rect.js';

export const TILE_SIZE: number = 64; 
export const MAP_SIZE: number = 10;
const MAP: number[] = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
];

export class Canvastein {
	private lastTimeStamp: DOMHighResTimeStamp;

	constructor() {
		Renderer.SetCanvasSize(1920, 1080);
		this.lastTimeStamp = 0;
	}

	public Run(): void {
		window.requestAnimationFrame(this.GameLoop.bind(this));
	}

	private GameLoop(timeStamp: DOMHighResTimeStamp): void {
		const deltaTime: number = this.lastTimeStamp != 0 ? (timeStamp - this.lastTimeStamp) / 1000 : 1 / 60;

		Renderer.InitFrame('white');
		this.DrawMap();
		Renderer.DrawText(`FPS: ${Math.round(1/deltaTime)}`, 5, 5, 40, 'white', 'monospace', 5, 'black');

		this.lastTimeStamp = timeStamp;
		window.requestAnimationFrame(this.GameLoop.bind(this));
	}

	private DrawMap(): void {
		let rect: Rect = new Rect(0, 0, TILE_SIZE, TILE_SIZE);

		for(let y=0; y<MAP_SIZE; ++y) {
			for(let x=0; x<MAP_SIZE; ++x) {
				rect.x = x * TILE_SIZE;
				rect.y = y * TILE_SIZE;

				const tile: number = MAP[x + y * MAP_SIZE];
				if(tile == 0) continue;
			}
		}
	}
}
