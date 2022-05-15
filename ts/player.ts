import { Vector2 } from './vector2.js';
import * as Maths from './maths.js';
import { Canvastein } from './canvastein.js';


export class Player {
	public position: Vector2;
	public yaw: number;
	public pitch: number;

	private input = {
		walkLeft: false,
		walkRight: false,
		walkForward: false,
		walkBackward: false,
		rotateLeft: false,
		rotateRight: false,
	};

	private moveSpeed: number = 2;

	constructor(position: Vector2, yaw: number) {
		this.position = position;
		this.yaw = yaw;
		this.pitch = 0;

		window.addEventListener('keypress', this.OnKeyPress.bind(this));
		window.addEventListener('keyup', this.OnKeyUp.bind(this));
		window.addEventListener('mousemove', this.OnMouseMove.bind(this));
	}

	public Update(canvastein: Canvastein, frameDelta: number, ) {
		const yawRad: number = Maths.Deg2Rad(this.yaw);
		let moveDirection: Vector2 = Vector2.Zero();
		if(this.input.walkForward) {
			moveDirection.x += Math.cos(yawRad);
			moveDirection.y -= Math.sin(yawRad);
		}
		if(this.input.walkBackward) {
			moveDirection.x -= Math.cos(yawRad);
			moveDirection.y += Math.sin(yawRad);
		}
		if(this.input.walkLeft) {
			moveDirection.x += Math.cos(yawRad + Math.PI/2);
			moveDirection.y -= Math.sin(yawRad + Math.PI/2);
		}
		if(this.input.walkRight) {
			moveDirection.x -= Math.cos(yawRad + Math.PI/2);
			moveDirection.y += Math.sin(yawRad + Math.PI/2);
		}

		moveDirection = moveDirection.Mul(frameDelta * this.moveSpeed);

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

	private Rotate(yaw: number, pitch: number) {
		this.yaw += yaw;
		if(this.yaw < 0) this.yaw += 360;
		if(this.yaw > 360) this.yaw -= 360;

		this.pitch += pitch;
		if(this.pitch > 90) this.pitch = 90;
		else if(this.pitch < -90) this.pitch = -90;
	}

	private OnKeyPress(e: KeyboardEvent) {
		e.preventDefault();

		switch(e.key) {
			case 'w': this.input.walkForward = true; break;
			case 's': this.input.walkBackward = true; break;
			case 'a': this.input.walkLeft = true; break;
			case 'd': this.input.walkRight = true; break;
		}
	}

	private OnKeyUp(e: KeyboardEvent) {
		e.preventDefault();

		switch(e.key) {
			case 'w': this.input.walkForward = false; break;
			case 's': this.input.walkBackward = false; break;
			case 'a': this.input.walkLeft = false; break;
			case 'd': this.input.walkRight = false; break;
		}
	}

	private OnMouseMove(e: MouseEvent) {
		this.Rotate(-e.movementX * 0.1, e.movementY * 0.1);
	}
}
