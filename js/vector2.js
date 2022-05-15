export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    Copy() {
        return new Vector2(this.x, this.y);
    }
    Add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    Sub(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    Mul(val) {
        return new Vector2(this.x * val, this.y * val);
    }
    GetLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Normalized() {
        let len = this.GetLength();
        let result = new Vector2(0, 0);
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
    DistanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
