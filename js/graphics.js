import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { WebGLRenderer } from './renderers/webgl_renderer.js';
import { Canvas2dRenderer } from './renderers/canvas2d_renderer.js';
export let canvas;
export const clearColor = new Color(0, 0, 1);
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
export var RendererEnum;
(function (RendererEnum) {
    RendererEnum[RendererEnum["WebGL"] = 0] = "WebGL";
    RendererEnum[RendererEnum["Canvas2D"] = 1] = "Canvas2D";
})(RendererEnum || (RendererEnum = {}));
;
export function Init(_api) {
    if (canvas) {
        canvas.remove();
    }
    canvas = document.createElement('canvas');
    canvasContainer.appendChild(canvas);
    if (!guiCanvas) {
        guiCanvas = document.createElement('canvas');
        guiCanvas.id = 'gui-canvas';
        canvasContainer.appendChild(guiCanvas);
        guiCtx = guiCanvas.getContext('2d');
    }
    switch (_api) {
        case RendererEnum.WebGL:
            renderer = new WebGLRenderer();
            rendererEnum = RendererEnum.WebGL;
            if (!renderer.HasInitialized()) {
                alert('Falling back to Canvas2D renderer. This renderer is experimental and may look different than the WebGL version.');
                renderer = new Canvas2dRenderer();
                rendererEnum = RendererEnum.Canvas2D;
            }
            break;
        case RendererEnum.Canvas2D:
            renderer = new Canvas2dRenderer();
            rendererEnum = RendererEnum.Canvas2D;
            break;
    }
    SetSize(window.innerWidth, window.innerWidth * 9 / 16);
}
export function DrawLine(from, to, fromColor, toColor) {
    renderer.DrawLine(from, to, fromColor, toColor);
}
export function DrawGuiLine(from, to, width, color) {
    width *= scaleRatio;
    guiCtx.beginPath();
    guiCtx.moveTo(from.x, from.y);
    guiCtx.lineTo(to.x, to.y);
    guiCtx.strokeStyle = color.ToHtmlString();
    guiCtx.lineWidth = width;
    guiCtx.stroke();
    guiCtx.closePath();
}
export function DrawGuiText(text, position = Vector2.Zero(), color = new Color(0, 0, 0), align = 'left', baseLine = 'top', fontSize = 50, font = 'monospace') {
    fontSize *= scaleRatio;
    position.y *= scaleRatio;
    guiCtx.beginPath();
    guiCtx.textAlign = align;
    guiCtx.textBaseline = baseLine;
    guiCtx.font = `${fontSize}px ${font}`;
    guiCtx.fillStyle = color.ToHtmlString();
    guiCtx.fillText(text, position.x, position.y);
    guiCtx.closePath();
}
export function ClearGui() {
    guiCtx.clearRect(0, 0, guiCanvas.width, guiCanvas.height);
}
export function BeginFrame(player) {
    guiCanvas.style.visibility = guiEnabled ? "visible" : "hidden";
    scaleRatio = guiCanvas.width / 1920;
    renderer.BeginFrame(player);
}
export function EndFrame() {
    renderer.EndFrame();
}
export function SetSize(width = 1920, height = 1080) {
    canvas.width = width;
    canvas.height = height;
    guiCanvas.width = width;
    guiCanvas.height = height;
    halfWidth = width / 2;
    halfHeight = height / 2;
    renderer.OnResize(width, height);
}
export function SetLineWidth(width) {
    lineWidth = width;
}
export function SetGuiEnabled(v) {
    guiEnabled = v;
}
window.addEventListener('resize', () => {
    SetSize(window.innerWidth, window.innerWidth * 9 / 16);
});
