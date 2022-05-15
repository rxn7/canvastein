import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { WebGLApi } from './webgl_api.js';
import { Canvas2dApi } from './canvas2d_api.js';
export let canvas;
export const clearColor = new Color(0, 0, 1);
export let lineWidth = 1;
export let api;
export let apiType;
let guiCanvas;
let guiCtx;
export var RenderingApiType;
(function (RenderingApiType) {
    RenderingApiType[RenderingApiType["WebGL"] = 0] = "WebGL";
    RenderingApiType[RenderingApiType["Canvas2D"] = 1] = "Canvas2D";
})(RenderingApiType || (RenderingApiType = {}));
;
let halfHeight = 0;
let halfWidth = 0;
export function Init(_api) {
    apiType = _api;
    if (canvas) {
        canvas.remove();
    }
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    if (!guiCanvas) {
        guiCanvas = document.createElement('canvas');
        guiCanvas.id = 'gui-canvas';
        document.body.appendChild(guiCanvas);
        guiCtx = guiCanvas.getContext('2d');
    }
    switch (_api) {
        case RenderingApiType.WebGL:
            api = new WebGLApi();
            if (!api.HasInitialized()) {
                alert('Falling back to Canvas2D renderer. This renderer is experimental and may look different than the WebGL version.');
                api = new Canvas2dApi();
            }
            break;
        case RenderingApiType.Canvas2D:
            api = new Canvas2dApi();
            break;
    }
    if (!api.HasInitialized()) {
        alert("Failed to initialize the rendering api!");
        return;
    }
    SetSize(window.innerWidth, window.innerHeight);
}
export function DrawLine(from, to, fromColor, toColor) {
    api.DrawLine(from, to, fromColor, toColor);
}
export function DrawText(text, position = Vector2.Zero(), color = new Color(0, 0, 0), align = 'left', baseLine = 'top', fontSize = 50, font = 'monospace') {
    guiCtx.beginPath();
    guiCtx.textAlign = align;
    guiCtx.textBaseline = baseLine;
    guiCtx.font = `$${fontSize}px ${font}`;
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
    guiCanvas.width = width / 2;
    guiCanvas.height = height / 2;
    halfWidth = width / 2;
    halfHeight = height / 2;
    api.OnResize(width, height);
}
export function SetLineWidth(width) {
    lineWidth = width;
}
window.addEventListener('resize', () => {
    SetSize(window.innerWidth, window.innerHeight);
});
export function GetHalfWidth() { return halfWidth; }
export function GetHalfHeight() { return halfHeight; }
export function GetWidth() { return canvas.width; }
export function GetHeight() { return canvas.height; }
