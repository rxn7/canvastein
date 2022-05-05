export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export function DrawText(text, x = 0, y = 0, size = 20, color = 'white', font = 'monospace', strokeSize = 0, strokeColor = 'black', align = 'left', baseline = 'top') {
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    if (strokeSize != 0) {
        ctx.lineJoin = 'bevel';
        ctx.lineWidth = strokeSize;
        ctx.strokeStyle = strokeColor;
        ctx.strokeText(text, x, y);
    }
    ctx.fillText(text, x, y);
}
export function FillRect(rect, style) {
    ctx.fillStyle = style;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}
export function Begin() {
    ctx.beginPath();
}
export function End() {
    ctx.closePath();
}
export function AddRect(rect) {
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
}
export function Fill(style) {
    ctx.fillStyle = style;
    ctx.fill();
}
export function Stroke(style) {
    ctx.strokeStyle = style;
    ctx.stroke();
}
export function InitFrame(color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
export function SetCanvasSize(width = 1920, height = 1080) {
    canvas.width = width;
    canvas.height = height;
}
