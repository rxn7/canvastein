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

	public Mul(val: number, mulAlpha: boolean = false) {
		this.r *= val;
		this.g *= val;
		this.b *= val;
		mulAlpha && (this.a *= val);
	}
}
