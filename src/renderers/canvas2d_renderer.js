import { Renderer } from './renderer.js';
import { Graphics } from '../graphics.js';
export class Canvas2dRenderer extends Renderer {
    constructor() {
        super(0.2);
        this.ctx = Graphics.canvas.getContext('2d');
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
        this.ctx.fillStyle = Graphics.clearColor.toHtmlString();
        this.ctx.fillRect(0, 0, Graphics.canvas.width, Graphics.canvas.height);
        this.ctx.lineWidth = Graphics.lineWidth;
    }
    endFrame() { }
    drawLine(from, to, fromColor, toColor) {
        const mapToCanvasWidth = (v) => ((v + 1) / 2) * Graphics.canvas.width;
        const mapToCanvasHeight = (v) => Graphics.canvas.height - ((v + 1) / 2) * Graphics.canvas.height;
        from.x = mapToCanvasWidth(from.x);
        from.y = mapToCanvasHeight(from.y);
        to.x = mapToCanvasWidth(to.x);
        to.y = mapToCanvasHeight(to.y);
        this.ctx.beginPath();
        let gradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, fromColor.toHtmlString());
        gradient.addColorStop(1, toColor.toHtmlString());
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = Graphics.lineWidth;
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    onResize(width, height) { }
}
