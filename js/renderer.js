export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export function DrawText(text, x = 0, y = 0, fontSize = 20, fontColor = 'white', align = 'left', baseLine = 'top', font = 'monospace') {
    ctx.fillStyle = fontColor;
    ctx.font = `${fontSize}px ${font}`;
    ctx.textAlign = align;
    ctx.textBaseline = baseLine;
    ctx.fillText(text, x, y);
}
export function ClearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
export function UpdateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', UpdateCanvasSize);
