import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { WebGLApi } from './webgl_api.js';
import { Canvas2dApi } from './canvas2d_api.js';
export let canvas;
export const clearColor = new Color(0, 0, 1);
export let lineWidth = 1;
export let apiType;
export let guiCanvas;
export let halfHeight = 0;
export let halfWidth = 0;
let api;
let guiCtx;
const canvasContainer = document.getElementById('canvas-container');
export var RenderingApiType;
(function (RenderingApiType) {
    RenderingApiType[RenderingApiType["WebGL"] = 0] = "WebGL";
    RenderingApiType[RenderingApiType["Canvas2D"] = 1] = "Canvas2D";
})(RenderingApiType || (RenderingApiType = {}));
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
        case RenderingApiType.WebGL:
            api = new WebGLApi();
            apiType = RenderingApiType.WebGL;
            if (!api.HasInitialized()) {
                alert('Falling back to Canvas2D renderer. This renderer is experimental and may look different than the WebGL version.');
                api = new Canvas2dApi();
                apiType = RenderingApiType.Canvas2D;
            }
            break;
        case RenderingApiType.Canvas2D:
            api = new Canvas2dApi();
            apiType = RenderingApiType.Canvas2D;
            break;
    }
    SetSize(window.innerWidth, window.innerWidth * 9 / 16);
}
export function DrawLine(from, to, fromColor, toColor) {
    api.DrawLine(from, to, fromColor, toColor);
}
export function DrawGuiLine(from, to, width, color) {
    guiCtx.beginPath();
    guiCtx.moveTo(from.x, from.y);
    guiCtx.lineTo(to.x, to.y);
    guiCtx.strokeStyle = color.ToHtmlString();
    guiCtx.lineWidth = width;
    guiCtx.stroke();
    guiCtx.closePath();
}
export function DrawGuiText(text, position = Vector2.Zero(), color = new Color(0, 0, 0), align = 'left', baseLine = 'top', fontSize = 50, font = 'monospace') {
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
export function BeginFrame() {
    api.BeginFrame();
}
export function EndFrame() {
    api.EndFrame();
}
export function SetSize(width = 1920, height = 1080) {
    canvas.width = width;
    canvas.height = height;
    guiCanvas.width = width;
    guiCanvas.height = height;
    halfWidth = width / 2;
    halfHeight = height / 2;
    api.OnResize(width, height);
}
export function SetLineWidth(width) {
    lineWidth = width;
}
window.addEventListener('resize', () => {
    SetSize(window.innerWidth, window.innerWidth * 9 / 16);
});
