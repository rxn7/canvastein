import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { WebGLRenderer } from './renderers/webgl_renderer.js';
import { Canvas2dRenderer } from './renderers/canvas2d_renderer.js';
export let canvas;
export const clearColor = new Color(0.43, 0.5, 0.87);
export let lineWidth = 1;
export let rendererEnum;
export let guiCanvas;
export let halfHeight = 0;
export let halfWidth = 0;
export let scaleRatio;
export let guiEnabled = true;
let renderer;
let guiCtx;
const canvasContainer = document.getElementById('canvas-container');
export var RendererType;
(function (RendererType) {
    RendererType[RendererType["WebGL"] = 0] = "WebGL";
    RendererType[RendererType["Canvas2D"] = 1] = "Canvas2D";
})(RendererType || (RendererType = {}));
export function init(rendererType) {
    if (canvas)
        canvas.remove();
    canvas = document.createElement('canvas');
    canvasContainer.appendChild(canvas);
    if (!guiCanvas) {
        guiCanvas = document.createElement('canvas');
        guiCanvas.id = 'gui-canvas';
        canvasContainer.appendChild(guiCanvas);
        guiCtx = guiCanvas.getContext('2d');
    }
    switch (rendererType) {
        case RendererType.WebGL:
            renderer = new WebGLRenderer();
            rendererEnum = RendererType.WebGL;
            if (!renderer.hasInitialized()) {
                alert('Falling back to Canvas2D renderer. This renderer is experimental and may look different than the WebGL version.');
                renderer = new Canvas2dRenderer();
                rendererEnum = RendererType.Canvas2D;
            }
            break;
        case RendererType.Canvas2D:
            renderer = new Canvas2dRenderer();
            rendererEnum = RendererType.Canvas2D;
            break;
    }
    setSize(window.innerWidth, (window.innerWidth * 9) / 16);
}
export function drawLine(from, to, fromColor, toColor) {
    renderer.drawLine(from, to, fromColor, toColor);
}
export function drawGuiLine(from, to, width, color) {
    width *= scaleRatio;
    guiCtx.beginPath();
    guiCtx.moveTo(from.x, from.y);
    guiCtx.lineTo(to.x, to.y);
    guiCtx.strokeStyle = color.toHtmlString();
    guiCtx.lineWidth = width;
    guiCtx.stroke();
    guiCtx.closePath();
}
export function drawGuiText(text, position = Vector2.Zero(), color = new Color(0, 0, 0), align = 'left', baseLine = 'top', fontSize = 50, font = 'monospace') {
    fontSize *= scaleRatio;
    position.y *= scaleRatio;
    guiCtx.beginPath();
    guiCtx.textAlign = align;
    guiCtx.textBaseline = baseLine;
    guiCtx.font = `${fontSize}px ${font}`;
    guiCtx.fillStyle = color.toHtmlString();
    guiCtx.fillText(text, position.x, position.y);
    guiCtx.closePath();
}
export function clearGui() {
    guiCtx.clearRect(0, 0, guiCanvas.width, guiCanvas.height);
}
export function beginFrame(player) {
    guiCanvas.style.visibility = guiEnabled ? 'visible' : 'hidden';
    scaleRatio = guiCanvas.width / 1920;
    renderer.beginFrame(player);
}
export function endFrame() {
    renderer.endFrame();
}
export function setSize(width = 1920, height = 1080) {
    canvas.width = width;
    canvas.height = height;
    guiCanvas.width = width;
    guiCanvas.height = height;
    halfWidth = width / 2;
    halfHeight = height / 2;
    renderer.onResize(width, height);
}
export function setLineWidth(width) {
    lineWidth = width;
}
export function setGuiEnabled(v) {
    guiEnabled = v;
}
window.addEventListener('resize', () => {
    setSize(window.innerWidth, (window.innerWidth * 9) / 16);
});
