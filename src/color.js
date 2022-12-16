import * as Maths from './helpers/mathHelper.js';
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
    mul(v, mulAlpha = false) {
        return new Color(this.r * v, this.g * v, this.b * v, (mulAlpha && this.a * v) || this.a);
    }
    equals(other) {
        return this.r == other.r && this.g == other.g && this.b == other.b;
    }
    toHtmlString() {
        return `rgb(${Math.floor(this.r * 255)},${Math.floor(this.g * 255)},${Math.floor(this.b * 255)})`;
    }
    mix(other, factor) {
        return new Color(Maths.lerp(this.r, other.r, factor), Maths.lerp(this.g, other.g, factor), Maths.lerp(this.b, other.b, factor));
    }
}
Color.Black = () => new Color(0, 0, 0, 0);
