import { Vector2 } from './vector2.js';

const MOVE_SPEED: number = 100;

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
		let moveDirection: Vector2 = new Vector2(0,0);
		if(this.up) moveDirection.y--;
		if(this.down) moveDirection.y++;
		if(this.left) moveDirection.x--;
		if(this.right) moveDirection.x++;

		this.position.x += moveDirection.x * MOVE_SPEED * deltaTime;
		this.position.y += moveDirection.y * MOVE_SPEED * deltaTime;
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
