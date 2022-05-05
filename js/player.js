const MOVE_SPEED = 100;
const ROTATE_SPEED = 2;
export class Player {
    constructor(position, angle) {
        this.position = position;
        this.angle = angle;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        window.addEventListener('keypress', this.OnKeyPress.bind(this));
        window.addEventListener('keyup', this.OnKeyUp.bind(this));
    }
    Update(deltaTime) {
        if (this.left)
            this.angle -= ROTATE_SPEED * deltaTime;
        if (this.right)
            this.angle += ROTATE_SPEED * deltaTime;
        if (this.up) {
            this.position.x += Math.cos(this.angle) * MOVE_SPEED * deltaTime;
            this.position.y += Math.sin(this.angle) * MOVE_SPEED * deltaTime;
        }
        else if (this.down) {
            this.position.x += Math.cos(this.angle) * MOVE_SPEED * deltaTime;
            this.position.y += Math.sin(this.angle) * MOVE_SPEED * deltaTime;
        }
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
