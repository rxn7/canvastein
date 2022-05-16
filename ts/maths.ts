export function Deg2Rad(deg: number): number {
	return deg * (Math.PI / 180);
}

export function Clamp(v: number, min: number, max: number): number {
	if(v < min) v = min;
	else if(v > max) v = max;
	return v;
}

export function Lerp(a: number, b: number, factor: number): number {
	factor = Clamp(factor, 0, 1);
	return (1-factor)*a + factor*b;
}
