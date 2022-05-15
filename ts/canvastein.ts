import * as Renderer from './renderer.js'
import * as Maths from './maths.js'
import { Player } from './player.js';
import { Vector2 } from './vector2.js';
import { Color } from './color.js';

export class Canvastein {
	private player: Player;
	private lastTimeStamp: DOMHighResTimeStamp;
	private frameDelta: number;
	private changeApi: boolean = false;
	public map: Array<Array<number>> = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 1, 1, 1, 1, 0, 1, 1, 1], 
		[1, 0, 1, 0, 1, 0, 0, 0, 1, 1], 
		[1, 0, 1, 0, 1, 0, 0, 0, 0, 1], 
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 1], 
		[1, 0, 0, 0, 0, 1, 1, 0, 0, 1], 
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
		[1, 0, 0, 0, 1, 0, 0, 0, 1, 1], 
		[1, 0, 0, 0, 1, 0, 1, 1, 1, 1], 
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
	];

	constructor() {
		Renderer.Init(Renderer.RenderingApiType.WebGL);
		Renderer.SetSize(window.innerWidth, window.innerHeight);
		Renderer.guiCanvas.addEventListener('click', () => Renderer.canvas.requestPointerLock());
		this.player = new Player(new Vector2(this.map[0].length/2, this.map.length/2), 0);
		this.frameDelta = 0;
		this.lastTimeStamp = 0;

		window.addEventListener('keypress', (event: KeyboardEvent) => {
			if(event.key == 'p') {
				this.changeApi = true;
			}
		});
	}

	public async Run() {
		this.StartUpdateGuiTask();
		window.requestAnimationFrame(this.GameLoop.bind(this));
	}

	private async StartUpdateGuiTask() {
		while(true) {
			await new Promise(resolve => setTimeout(resolve, 200));
			Renderer.ClearGui();
			Renderer.DrawText(`FPS: ${Math.round(1/this.frameDelta)}`);
		}
	}

	private GameLoop(now: DOMHighResTimeStamp): void {
		this.frameDelta = this.lastTimeStamp != 0 ? (now - this.lastTimeStamp) / 1000 : 1 / 60;
		if(this.changeApi) {
			if(Renderer.apiType == Renderer.RenderingApiType.Canvas2D) {
				Renderer.Init(Renderer.RenderingApiType.WebGL);
			} else {
				Renderer.Init(Renderer.RenderingApiType.Canvas2D);
			}
			this.changeApi = false;
		}

		this.player.Update(this, this.frameDelta);

		Renderer.BeginFrame();
		this.DrawWorld();
		Renderer.EndFrame();

		this.lastTimeStamp = now;
		window.requestAnimationFrame(this.GameLoop.bind(this));
	}

	private DrawWorld(): void {
		let rayCount: number = Renderer.canvas.width;
		if(Renderer.apiType == Renderer.RenderingApiType.Canvas2D) rayCount /= 12; // Lower the quality if using Canvas2D renderer. Canvas2D renderer can't handle rendering that much lines.

		const forwardDirection: Vector2 = new Vector2(Math.cos(Maths.Deg2Rad(this.player.yaw)), -Math.sin(Maths.Deg2Rad(this.player.yaw)));
		const rightDirection: Vector2 = new Vector2(-forwardDirection.y, forwardDirection.x);
		let rayPosition: Vector2 = this.player.position.Copy();
		const playerPitch: number = Maths.Deg2Rad(this.player.pitch) * 2;

		Renderer.SetLineWidth((Renderer.canvas.width / rayCount) + 2);
		for(let rayIndex: number = 0; rayIndex<rayCount; rayIndex++) {
			const interpolationCoefficient = 2.0 * rayIndex / rayCount - 1.0;
			const rayDirection: Vector2 = new Vector2(forwardDirection.x + interpolationCoefficient * rightDirection.x, forwardDirection.y + interpolationCoefficient * rightDirection.y);
			const mapPosition: Vector2 = new Vector2(Math.floor(rayPosition.x), Math.floor(rayPosition.y));
			let deltaDist: Vector2 = new Vector2(); // Distance to the next tile
			let sideDist: Vector2 = new Vector2();
			let step: Vector2 = new Vector2();
			let side = 0; // 0 - horizontal, 1 - vertical

			if(Math.abs(rayDirection.x) < 1e-8) { // Make sure to not divide by 0
				deltaDist.x = 1e8;
			} else {
				deltaDist.x = Math.abs(1 / rayDirection.x);
			}

			if(Math.abs(rayDirection.y) < 1e-8) { // Make sure to not divide by 0
				deltaDist.y = 1e8;
			} else {
				deltaDist.y = Math.abs(1 / rayDirection.y);
			}

			if(rayDirection.x < 0) { // Left
				step.x = -1;
				sideDist.x = (rayPosition.x - mapPosition.x) * deltaDist.x;
			} else { // Right
				step.x = 1;
				sideDist.x = (mapPosition.x + 1 - rayPosition.x) * deltaDist.x; 
			}

			if(rayDirection.y < 0) { // Down
				step.y = -1;
				sideDist.y = (rayPosition.y - mapPosition.y) * deltaDist.y;
			} else { // Up
				step.y = 1;
				sideDist.y = (mapPosition.y + 1 - rayPosition.y) * deltaDist.y; 
			}

			let hit: number = 0;
			while(hit == 0) {
				if(sideDist.x < sideDist.y) {
					sideDist.x += deltaDist.x;
					mapPosition.x += step.x;
					side = 0;
				} else {
					sideDist.y += deltaDist.y;
					mapPosition.y += step.y;
					side = 1;
				}

				hit = this.map[mapPosition.y][mapPosition.x];
			}

			let wallDistance: number = 0;
			if(side == 0)	wallDistance = Math.abs(sideDist.x - deltaDist.x);
			else 		wallDistance = Math.abs(sideDist.y - deltaDist.y);

			let wallHeight: number = 0.5 / wallDistance;
			let fromColor: Color = new Color(0.9, 0.9, 0.9);
			let toColor: Color = new Color(0.95, 0.95, 0.95);

			if(side == 1) {
				fromColor.Mul(0.9);
				toColor.Mul(0.9);
			}

			Renderer.DrawLine(new Vector2(interpolationCoefficient, wallHeight + playerPitch), new Vector2(interpolationCoefficient, -wallHeight + playerPitch), fromColor, toColor);
			Renderer.DrawLine(new Vector2(interpolationCoefficient, -1), new Vector2(interpolationCoefficient, -wallHeight + playerPitch), new Color(0.4, 0.4, 0.4), new Color(0.2, 0.2, 0.2));
		}
	}
}
