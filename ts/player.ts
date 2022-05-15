import { Vector2 } from './vector2.js';
import * as Maths from './maths.js';
import { Canvastein } from './canvastein.js';


export class Player {
	public position: Vector2;
	public angle: number;

	private left: boolean;
	private right: boolean;
	private up: boolean;
	private down: boolean;
	private moveSpeed: number = 5;
	private rotateSpeed: number = 200;

	constructor(position: Vector2, angle: number) {
		this.position = position;
		this.angle = angle;
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;

		window.addEventListener('keypress', this.OnKeyPress.bind(this));
		window.addEventListener('keyup', this.OnKeyUp.bind(this));
	}

	public Update(canvastein: Canvastein, frameDelta: number, ) {
		if(this.left)	this.Rotate(this.rotateSpeed * frameDelta);
		if(this.right)	this.Rotate(-this.rotateSpeed * frameDelta);

		const angleRad: number = Maths.Deg2Rad(this.angle);

		let moveDirection: Vector2 = new Vector2();
		let moveDirectionMultiplier: number = 0;

		this.up && moveDirectionMultiplier++;
		this.down && moveDirectionMultiplier--;

		moveDirection.x = moveDirectionMultiplier * Math.cos(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;
		moveDirection.y = moveDirectionMultiplier * -Math.sin(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;

		if((Math.floor(this.position.x + moveDirection.x) >= 0) && (Math.floor(this.position.x + moveDirection.x) < canvastein.map[0].length)) {
			if(canvastein.map[Math.floor(this.position.y)][Math.floor(this.position.x + moveDirection.x)] == 0) {
				this.position.x += moveDirection.x;
			}
		}

		if((Math.floor(this.position.y + moveDirection.y) >= 0) && (Math.floor(this.position.y + moveDirection.y) < canvastein.map.length)) {
			if(canvastein.map[Math.floor(this.position.y + moveDirection.y)][Math.floor(this.position.x)] == 0) {
				this.position.y += moveDirection.y;
			}
		}
	}

	private Rotate(angle: number) {
		this.angle += angle;
		if(this.angle < 0) this.angle += 360;
		if(this.angle > 360) this.angle -= 360;
	}

	private OnKeyPress(e: KeyboardEvent) {
		e.preventDefault();

		switch(e.key) {
			case 'w': this.up = true; break;
			case 's': this.down = true; break;
			case 'a': this.left = true; break;
			case 'd': this.right = true; break;
		}
	}

	private OnKeyUp(e: KeyboardEvent) {
		e.preventDefault();

		switch(e.key) {
			case 'w': this.up = false; break;
			case 's': this.down = false; break;
			case 'a': this.left = false; break;
			case 'd': this.right = false; break;
		}
	}
}
