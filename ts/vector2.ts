export class Vector2 {
	public x: number;
	public y: number;

	public constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	public static Zero(): Vector2 {
		return new Vector2(0,0);
	}

	public Copy(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	public Add(other: Vector2): Vector2 {
		return new Vector2(this.x + other.x, this.y + other.y);
	}

	public Sub(other: Vector2): Vector2 {
		return new Vector2(this.x - other.x, this.y - other.y);
	}

	public Mul(val: number): Vector2 {
		return new Vector2(this.x * val, this.y * val);
	}

	public GetLength(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public Normalized(): Vector2 {
		let len: number = this.GetLength();
		let result: Vector2 = new Vector2(0,0);

		if(len != 0) {
			result.x /= len;
			result.y /= len;
		} else {
			result.x = 0;
			result.y = 0;
		}

		return result;
	}

	public DistanceTo(other: Vector2): number {
		const dx: number = this.x - other.x;
		const dy: number = this.y - other.y;
		return Math.sqrt(dx*dx + dy*dy);
	}
}
