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

	public Mul(val: number, mulAlpha: boolean = false): void {
		this.r *= val;
		this.g *= val;
		this.b *= val;
		mulAlpha && (this.a *= val);
	}

	public Equals(other: Color): boolean {
		return this.r == other.r && this.g == other.g && this.b == other.b;
	}

	public ToHtmlString(): string {
		return `rgb(${Math.floor(this.r*255)},${Math.floor(this.g*255)},${Math.floor(this.b*255)})`;
	}

	public static Black(): Color { return new Color(0, 0, 0); }
}
