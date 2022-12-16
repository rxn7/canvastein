import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { WebGLRenderer } from './renderers/webgl_renderer.js';
import { Canvas2dRenderer } from './renderers/canvas2d_renderer.js';
export var Graphics;
(function (Graphics) {
    let RendererType;
    (function (RendererType) {
        RendererType[RendererType["WebGL"] = 0] = "WebGL";
        RendererType[RendererType["Canvas2D"] = 1] = "Canvas2D";
    })(RendererType = Graphics.RendererType || (Graphics.RendererType = {}));
    Graphics.clearColor = new Color(0.43, 0.5, 0.87);
    Graphics.lineWidth = 1;
    Graphics.halfHeight = 0;
    Graphics.halfWidth = 0;
    Graphics.guiEnabled = true;
    let guiCtx;
    const canvasContainer = document.getElementById('canvas-container');
    function init(rendererType) {
        if (Graphics.canvas)
            Graphics.canvas.remove();
        Graphics.canvas = document.createElement('canvas');
        canvasContainer.appendChild(Graphics.canvas);
        if (!Graphics.guiCanvas) {
            Graphics.guiCanvas = document.createElement('canvas');
            Graphics.guiCanvas.id = 'gui-canvas';
            canvasContainer.appendChild(Graphics.guiCanvas);
            guiCtx = Graphics.guiCanvas.getContext('2d');
        }
        switch (rendererType) {
            case RendererType.WebGL:
                Graphics.renderer = new WebGLRenderer();
                Graphics.rendererEnum = RendererType.WebGL;
                if (!Graphics.renderer.hasInitialized()) {
                    alert('Falling back to Canvas2D renderer. This renderer is experimental and may look different than the WebGL version.');
                    Graphics.renderer = new Canvas2dRenderer();
                    Graphics.rendererEnum = RendererType.Canvas2D;
                }
                break;
            case RendererType.Canvas2D:
                Graphics.renderer = new Canvas2dRenderer();
                Graphics.rendererEnum = RendererType.Canvas2D;
                break;
        }
        setSize(window.innerWidth, (window.innerWidth * 9) / 16);
    }
    Graphics.init = init;
    function drawLine(from, to, fromColor, toColor) {
        Graphics.renderer.drawLine(from, to, fromColor, toColor);
    }
    Graphics.drawLine = drawLine;
    function drawGuiLine(from, to, width, color) {
        width *= Graphics.scaleRatio;
        guiCtx.beginPath();
        guiCtx.moveTo(from.x, from.y);
        guiCtx.lineTo(to.x, to.y);
        guiCtx.strokeStyle = color.toHtmlString();
        guiCtx.lineWidth = width;
        guiCtx.stroke();
        guiCtx.closePath();
    }
    Graphics.drawGuiLine = drawGuiLine;
    function drawGuiText(text, position = Vector2.Zero(), color = new Color(0, 0, 0), align = 'left', baseLine = 'top', fontSize = 50, font = 'monospace') {
        fontSize *= Graphics.scaleRatio;
        position.y *= Graphics.scaleRatio;
        guiCtx.beginPath();
        guiCtx.textAlign = align;
        guiCtx.textBaseline = baseLine;
        guiCtx.font = `${fontSize}px ${font}`;
        guiCtx.fillStyle = color.toHtmlString();
        guiCtx.fillText(text, position.x, position.y);
        guiCtx.closePath();
    }
    Graphics.drawGuiText = drawGuiText;
    function clearGui() {
        guiCtx.clearRect(0, 0, Graphics.guiCanvas.width, Graphics.guiCanvas.height);
    }
    Graphics.clearGui = clearGui;
    function beginFrame(player) {
        Graphics.guiCanvas.style.visibility = Graphics.guiEnabled ? 'visible' : 'hidden';
        Graphics.scaleRatio = Graphics.guiCanvas.width / 1920;
        Graphics.renderer.beginFrame(player);
    }
    Graphics.beginFrame = beginFrame;
    function endFrame() {
        Graphics.renderer.endFrame();
    }
    Graphics.endFrame = endFrame;
    function setSize(width = 1920, height = 1080) {
        Graphics.canvas.width = width;
        Graphics.canvas.height = height;
        Graphics.guiCanvas.width = width;
        Graphics.guiCanvas.height = height;
        Graphics.halfWidth = width / 2;
        Graphics.halfHeight = height / 2;
        Graphics.renderer.onResize(width, height);
    }
    Graphics.setSize = setSize;
    function setLineWidth(width) {
        Graphics.lineWidth = width;
    }
    Graphics.setLineWidth = setLineWidth;
    function setGuiEnabled(v) {
        Graphics.guiEnabled = v;
    }
    Graphics.setGuiEnabled = setGuiEnabled;
    window.addEventListener('resize', () => {
        setSize(window.innerWidth, (window.innerWidth * 9) / 16);
    });
})(Graphics || (Graphics = {}));
