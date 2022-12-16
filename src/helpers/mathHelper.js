export function deg2Rad(deg) {
    return deg * (Math.PI / 180);
}
export function clamp(v, min, max) {
    if (v < min)
        v = min;
    else if (v > max)
        v = max;
    return v;
}
export function lerp(a, b, factor) {
    factor = clamp(factor, 0, 1);
    return (1 - factor) * a + factor * b;
}
