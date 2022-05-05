import { Vector2 } from './vector2.js';

const MOVE_SPEED: number = 100;
const ROTATE_SPEED: number = 2;

export class Player {
	public position: Vector2;
	public angle: number;

	private left: boolean;
	private right: boolean;
	private up: boolean;
	private down: boolean;

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

	public Update(deltaTime: number) {
		if(this.left) this.angle -= ROTATE_SPEED * deltaTime;
		if(this.right) this.angle += ROTATE_SPEED * deltaTime;

		if(this.up) {
			this.position.x += Math.cos(this.angle) * MOVE_SPEED * deltaTime;
			this.position.y += Math.sin(this.angle) * MOVE_SPEED * deltaTime;
		} else if(this.down) {
			this.position.x += Math.cos(this.angle) * MOVE_SPEED * deltaTime;
			this.position.y += Math.sin(this.angle) * MOVE_SPEED * deltaTime;
		}
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
