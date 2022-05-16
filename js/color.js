import * as Maths from './maths.js';
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
    Mul(v, mulAlpha = false) {
        return new Color(this.r * v, this.g * v, this.b * v, (mulAlpha && (this.a * v)) || (this.a));
    }
    Equals(other) {
        return this.r == other.r && this.g == other.g && this.b == other.b;
    }
    ToHtmlString() {
        return `rgb(${Math.floor(this.r * 255)},${Math.floor(this.g * 255)},${Math.floor(this.b * 255)})`;
    }
    Mix(other, factor) {
        return new Color(Maths.Lerp(this.r, other.r, factor), Maths.Lerp(this.g, other.g, factor), Maths.Lerp(this.b, other.b, factor));
    }
    static Black() { return new Color(0, 0, 0); }
}
