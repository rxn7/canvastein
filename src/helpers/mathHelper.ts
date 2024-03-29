export function deg2Rad(deg: number): number {
	return deg * (Math.PI / 180)
}

export function clamp(v: number, min: number, max: number): number {
	if (v < min) v = min
	else if (v > max) v = max
	return v
}

export function lerp(a: number, b: number, factor: number): number {
	factor = clamp(factor, 0, 1)
	return (1 - factor) * a + factor * b
}
