export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export function DrawText(text, position, size = 20, color = 'white', font = 'monospace', strokeSize = 0, strokeColor = 'black', align = 'left', baseline = 'top') {
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    if (strokeSize != 0) {
        ctx.lineJoin = 'bevel';
        ctx.lineWidth = strokeSize;
        ctx.strokeStyle = strokeColor;
        ctx.strokeText(text, position.x, position.y);
    }
    ctx.fillText(text, position.x, position.y);
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
export function AddCircle(position, radius) {
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
}
export function AddLine(start, end, width) {
    ctx.lineWidth = width;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
}
export function Fill(style) {
    ctx.fillStyle = style;
    ctx.fill();
}
export function Stroke(style) {
    ctx.strokeStyle = style;
    ctx.stroke();
}
export function BeginFrame(color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
export function SetCanvasSize(width = 1920, height = 1080) {
    canvas.width = width;
    canvas.height = height;
}
