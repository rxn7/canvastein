export class Color {
    constructor(r, g, b, a = 1.0) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    Mul(val, mulAlpha = false) {
        this.r *= val;
        this.g *= val;
        this.b *= val;
        mulAlpha && (this.a *= val);
    }
    Equals(other) {
        return this.r == other.r && this.g == other.g && this.b == other.b;
    }
}
