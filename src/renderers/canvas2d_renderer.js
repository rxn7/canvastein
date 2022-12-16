import { Renderer } from './renderer.js';
import { canvas, lineWidth, clearColor } from '../graphics.js';
export class Canvas2dRenderer extends Renderer {
    constructor() {
        super();
        this.ctx = canvas.getContext('2d');
        if (!this.ctx) {
            this.initialized = false;
            return;
        }
        this.initialized = true;
    }
    hasInitialized() {
        return this.initialized;
    }
    beginFrame() {
        this.ctx.fillStyle = clearColor.toHtmlString();
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.ctx.lineWidth = lineWidth;
    }
    endFrame() { }
    drawLine(from, to, fromColor, _toColor) {
        const mapToCanvasWidth = (v) => ((v + 1) / 2) * canvas.width;
        const mapToCanvasHeight = (v) => canvas.height - ((v + 1) / 2) * canvas.height;
        from.x = mapToCanvasWidth(from.x);
        from.y = mapToCanvasHeight(from.y);
        to.x = mapToCanvasWidth(to.x);
        to.y = mapToCanvasHeight(to.y);
        this.ctx.beginPath();
        this.ctx.strokeStyle = fromColor.toHtmlString();
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    onResize(_width, _height) { }
}
