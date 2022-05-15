import { WebGLApi } from './webgl_api.js';
export const canvas = document.getElementById('canvas');
let api;
let apiType;
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
    switch (_api) {
        case RenderingApiType.WebGL:
            api = new WebGLApi();
            break;
        case RenderingApiType.Canvas2D:
            break;
    }
    if (!api.HasInitialized()) {
        alert("Failed to initialize the rendering api!");
        return;
    }
}
export function DrawLine(from, to, fromColor, toColor) {
    api.DrawLine(from, to, fromColor, toColor);
}
export function BeginFrame() {
    api.BeginFrame();
}
export function EndFrame() {
    api.EndFrame();
}
export function SetCanvasSize(width = 1920, height = 1080) {
    canvas.width = width;
    canvas.height = height;
    halfWidth = width / 2;
    halfHeight = height / 2;
    api.OnResize(width, height);
}
window.addEventListener('resize', () => {
    SetCanvasSize(window.innerWidth, window.innerHeight);
});
export function GetHalfWidth() { return halfWidth; }
export function GetHalfHeight() { return halfHeight; }
export function GetWidth() { return canvas.width; }
export function GetHeight() { return canvas.height; }
