import * as Renderer from './renderer.js'
import { Rect } from './rect.js';

export const TILE_SIZE: number = 64; 

export const MAP_TILE_COUNT: number = 10;
export const MINIMAP_TILE_PADDING: number = 2;
export const MINIMAP_TILE_SIZE = 20;
export const MINIMAP_SIZE = MAP_TILE_COUNT * (MINIMAP_TILE_SIZE + MINIMAP_TILE_PADDING);

const MAP: number[] = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 
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
		this.DrawMinimap();
		Renderer.DrawText(`FPS: ${Math.round(1/deltaTime)}`, Renderer.canvas.width-5, 5, 40, 'white', 'monospace', 5, 'black', 'right');

		this.lastTimeStamp = timeStamp;
		window.requestAnimationFrame(this.GameLoop.bind(this));
	}

	private DrawMinimap(): void {
		Renderer.FillRect(new Rect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE), '#aaa');

		Renderer.Begin();
		let mapTileRect: Rect = new Rect(0, 0, MINIMAP_TILE_SIZE, MINIMAP_TILE_SIZE);
		for(let y=0; y<MAP_TILE_COUNT; ++y) {
			for(let x=0; x<MAP_TILE_COUNT; ++x) {
				mapTileRect.x = x * (MINIMAP_TILE_SIZE + MINIMAP_TILE_PADDING);
				mapTileRect.y = y * (MINIMAP_TILE_SIZE + MINIMAP_TILE_PADDING);

				const tile: number = MAP[x + y * MAP_TILE_COUNT];
				if(tile == 0) continue;

				Renderer.AddRect(mapTileRect);
			}
		}
		Renderer.Fill('#555');
		Renderer.End();
	}
}
