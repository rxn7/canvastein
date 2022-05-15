import { RenderingApi } from './rendering_api.js';
import { canvas, lineWidth, clearColor } from './renderer.js';
export class Canvas2dApi extends RenderingApi {
    constructor() {
        super();
        this.ctx = canvas.getContext('2d');
        ;
        if (!this.ctx) {
            this.initialized = false;
            return;
        }
        this.initialized = true;
    }
    HasInitialized() {
        return this.initialized;
    }
    BeginFrame() {
        this.ctx.fillStyle = clearColor.ToHtmlString();
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.ctx.lineWidth = lineWidth;
    }
    EndFrame() {
    }
    DrawLine(from, to, fromColor, _toColor) {
        const mapToCanvasWidth = (v) => (v + 1) / 2 * canvas.width;
        const mapToCanvasHeight = (v) => canvas.height - ((v + 1) / 2 * canvas.height);
        from.x = mapToCanvasWidth(from.x);
        from.y = mapToCanvasHeight(from.y);
        to.x = mapToCanvasWidth(to.x);
        to.y = mapToCanvasHeight(to.y);
        this.ctx.beginPath();
        this.ctx.strokeStyle = fromColor.ToHtmlString();
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    OnResize(_width, _height) {
    }
}
