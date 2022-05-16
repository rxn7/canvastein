export function Deg2Rad(deg) {
    return deg * (Math.PI / 180);
}
export function Clamp(v, min, max) {
    if (v < min)
        v = min;
    else if (v > max)
        v = max;
    return v;
}
export function Lerp(a, b, factor) {
    factor = Clamp(factor, 0, 1);
    return (1 - factor) * a + factor * b;
}
