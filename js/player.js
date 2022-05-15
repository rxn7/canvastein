import { Vector2 } from './vector2.js';
import * as Maths from './maths.js';
export class Player {
    constructor(position, angle) {
        this.moveSpeed = 5;
        this.rotateSpeed = 200;
        this.position = position;
        this.angle = angle;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        window.addEventListener('keypress', this.OnKeyPress.bind(this));
        window.addEventListener('keyup', this.OnKeyUp.bind(this));
    }
    Update(canvastein, frameDelta) {
        if (this.left)
            this.Rotate(this.rotateSpeed * frameDelta);
        if (this.right)
            this.Rotate(-this.rotateSpeed * frameDelta);
        const angleRad = Maths.Deg2Rad(this.angle);
        let moveDirection = new Vector2();
        let moveDirectionMultiplier = 0;
        this.up && moveDirectionMultiplier++;
        this.down && moveDirectionMultiplier--;
        moveDirection.x = moveDirectionMultiplier * Math.cos(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;
        moveDirection.y = moveDirectionMultiplier * -Math.sin(Maths.Deg2Rad(this.angle)) * frameDelta * this.moveSpeed;
        if ((Math.floor(this.position.x + moveDirection.x) >= 0) && (Math.floor(this.position.x + moveDirection.x) < canvastein.map[0].length)) {
            if (canvastein.map[Math.floor(this.position.y)][Math.floor(this.position.x + moveDirection.x)] == 0) {
                this.position.x += moveDirection.x;
            }
        }
        if ((Math.floor(this.position.y + moveDirection.y) >= 0) && (Math.floor(this.position.y + moveDirection.y) < canvastein.map.length)) {
            if (canvastein.map[Math.floor(this.position.y + moveDirection.y)][Math.floor(this.position.x)] == 0) {
                this.position.y += moveDirection.y;
            }
        }
    }
    Rotate(angle) {
        this.angle += angle;
        if (this.angle < 0)
            this.angle += 360;
        if (this.angle > 360)
            this.angle -= 360;
    }
    OnKeyPress(e) {
        e.preventDefault();
        switch (e.key) {
            case 'w':
                this.up = true;
                break;
            case 's':
                this.down = true;
                break;
            case 'a':
                this.left = true;
                break;
            case 'd':
                this.right = true;
                break;
        }
    }
    OnKeyUp(e) {
        e.preventDefault();
        switch (e.key) {
            case 'w':
                this.up = false;
                break;
            case 's':
                this.down = false;
                break;
            case 'a':
                this.left = false;
                break;
            case 'd':
                this.right = false;
                break;
        }
    }
}
