export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector2(this.x, this.y);
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    sub(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    mul(val) {
        return new Vector2(this.x * val, this.y * val);
    }
    getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    normalized() {
        let len = this.getLength();
        let result = this.copy();
        if (len != 0) {
            result.x /= len;
            result.y /= len;
        }
        else {
            result.x = 0;
            result.y = 0;
        }
        return result;
    }
    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
Vector2.Zero = () => new Vector2(0, 0);
