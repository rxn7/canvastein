import * as Renderer from './renderer.js';
import { Rect } from './rect.js';
export const SUBSCREEN_ASPECT_RATIO = 3 / 2;
export const TILE_SIZE = 64;
export const MAP_SIZE = 10;
export class Canvastein {
    constructor() {
        this.lastTimeStamp = 0;
        this.subScreenRect = new Rect();
        this.OnResize();
    }
    Run() {
        window.requestAnimationFrame(this.GameLoop.bind(this));
    }
    GameLoop(timeStamp) {
        const deltaTime = this.lastTimeStamp != 0 ? (timeStamp - this.lastTimeStamp) / 1000 : 1 / 60;
        Renderer.ClearCanvas();
        Renderer.DrawRect(this.subScreenRect, 'black');
        Renderer.DrawText(`FPS: ${Math.round(1 / deltaTime)}`, 5, 5, 40, 'white', 'monospace', 5, 'black');
        this.lastTimeStamp = timeStamp;
        window.requestAnimationFrame(this.GameLoop.bind(this));
    }
    CalculateSubScreenSize() {
        const proportionWidth = Renderer.canvas.height * SUBSCREEN_ASPECT_RATIO;
        if (proportionWidth < Renderer.canvas.width) {
            this.subScreenRect.width = proportionWidth;
            this.subScreenRect.x = Renderer.canvas.width / 2 - this.subScreenRect.width / 2;
        }
        else {
            this.subScreenRect.width = Renderer.canvas.width;
            this.subScreenRect.x = 0;
        }
        this.subScreenRect.height = this.subScreenRect.width / SUBSCREEN_ASPECT_RATIO;
        this.subScreenRect.y = Renderer.canvas.height / 2 - this.subScreenRect.height / 2;
    }
    OnResize() {
        Renderer.UpdateCanvasSize();
        this.CalculateSubScreenSize();
    }
}
