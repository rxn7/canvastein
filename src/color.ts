import * as Maths from './helpers/mathHelper.js'

export class Color {
	static Black = (): Color => new Color(0, 0, 0, 0)

	public r: number = 0
	public g: number = 0
	public b: number = 0
	public a: number = 0

	public constructor(r: number, g: number, b: number, a: number = 1.0) {
		this.r = r
		this.g = g
		this.b = b
		this.a = a
	}

	public mul(v: number, mulAlpha: boolean = false): Color {
		return new Color(this.r * v, this.g * v, this.b * v, (mulAlpha && this.a * v) || this.a)
	}

	public equals(other: Color): boolean {
		return this.r == other.r && this.g == other.g && this.b == other.b
	}

	public toHtmlString(): string {
		return `rgb(${Math.floor(this.r * 255)},${Math.floor(this.g * 255)},${Math.floor(this.b * 255)})`
	}

	public mix(other: Color, factor: number): Color {
		return new Color(Maths.lerp(this.r, other.r, factor), Maths.lerp(this.g, other.g, factor), Maths.lerp(this.b, other.b, factor))
	}
}
