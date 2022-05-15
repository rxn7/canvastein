import { Vector2 } from './vector2.js';
import * as Maths from './maths.js';
import { Canvastein } from './canvastein.js';


export class Player {
	public position: Vector2;
	public angle: number;

	private input = {
		walkLeft: false,
		walkRight: false,
		walkForward: false,
		walkBackward: false,
		rotateLeft: false,
		rotateRight: false,
	};
	private moveSpeed: number = 5;
	private rotateSpeed: number = 200;

	constructor(position: Vector2, angle: number) {
		this.position = position;
		this.angle = angle;

		window.addEventListener('keypress', this.OnKeyPress.bind(this));
		window.addEventListener('keyup', this.OnKeyUp.bind(this));
	}

	public Update(canvastein: Canvastein, frameDelta: number, ) {
		if(this.input.rotateLeft)	this.Rotate(this.rotateSpeed * frameDelta);
		if(this.input.rotateRight)	this.Rotate(-this.rotateSpeed * frameDelta);

		const angleRad: number = Maths.Deg2Rad(this.angle);

		let moveDirection: Vector2 = Vector2.Zero();

		if(this.up) {
			moveDirection.x += Math.cos(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;
			moveDirection.y += -Math.sin(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;
		}
		if(this.down) {
			moveDirection.x -= Math.cos(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;
			moveDirection.y -= -Math.sin(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;
		}
		if(this.left) {

		}


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
