import * as Maths from './maths.js';

export class Color {
	public r: number = 0;
	public g: number = 0;
	public b: number = 0;
	public a: number = 0;

	public constructor(r: number, g: number, b: number, a: number = 1.0) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	public Mul(v: number, mulAlpha: boolean = false): Color {
		return new Color(this.r * v, this.g * v, this.b * v, (mulAlpha && (this.a * v)) || (this.a));
	}

	public Equals(other: Color): boolean {
		return this.r == other.r && this.g == other.g && this.b == other.b;
	}

	public ToHtmlString(): string {
		return `rgb(${Math.floor(this.r*255)},${Math.floor(this.g*255)},${Math.floor(this.b*255)})`;
	}

	public Mix(other: Color, factor: number): Color {
		return new Color(Maths.Lerp(this.r, other.r, factor), Maths.Lerp(this.g, other.g, factor), Maths.Lerp(this.b, other.b, factor));
	}

	public static Black(): Color { return new Color(0, 0, 0); }
}
