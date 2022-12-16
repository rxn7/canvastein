export class Vector2 {
	public x: number
	public y: number

	static Zero = (): Vector2 => new Vector2(0, 0)

	public constructor(x: number = 0, y: number = 0) {
		this.x = x
		this.y = y
	}

	public copy(): Vector2 {
		return new Vector2(this.x, this.y)
	}

	public add(other: Vector2): Vector2 {
		return new Vector2(this.x + other.x, this.y + other.y)
	}

	public sub(other: Vector2): Vector2 {
		return new Vector2(this.x - other.x, this.y - other.y)
	}

	public mul(val: number): Vector2 {
		return new Vector2(this.x * val, this.y * val)
	}

	public getLength(): number {
		return Math.sqrt(this.x ** 2 + this.y ** 2)
	}

	public normalized(): Vector2 {
		let len: number = this.getLength()
		let result: Vector2 = this.copy()
		if (len != 0) {
			result.x /= len
			result.y /= len
		} else {
			result.x = 0
			result.y = 0
		}

		return result
	}

	public distanceTo(other: Vector2): number {
		const dx: number = this.x - other.x
		const dy: number = this.y - other.y
		return Math.sqrt(dx * dx + dy * dy)
	}
}
