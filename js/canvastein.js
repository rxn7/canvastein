var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Graphics from './graphics.js';
import * as Maths from './maths.js';
import { Player } from './player.js';
import { Vector2 } from './vector2.js';
import { Color } from './color.js';
export class Canvastein {
    constructor() {
        this.changeApi = false;
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        Graphics.Init(Graphics.RendererEnum.WebGL);
        Graphics.guiCanvas.addEventListener('click', () => Graphics.canvas.requestPointerLock());
        this.player = new Player(new Vector2(this.map[0].length / 2, this.map.length / 2), 0);
        this.frameDelta = 0;
        this.lastTimeStamp = 0;
        window.addEventListener('keypress', (event) => {
            if (event.key == 'p') {
                this.changeApi = true;
            }
        });
    }
    Run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.StartUpdateGuiTask();
            window.requestAnimationFrame(this.GameLoop.bind(this));
        });
    }
    StartUpdateGuiTask() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                yield new Promise(resolve => setTimeout(resolve, 200));
                Graphics.ClearGui();
                Graphics.DrawGuiText(`FPS: ${Math.round(1 / this.frameDelta)}`);
                Graphics.DrawGuiText('Press \'P\' to change renderer', new Vector2(Graphics.canvas.width, 0), Color.Black(), 'right');
                Graphics.DrawGuiText(`Graphics: ${Graphics.RendererEnum[Graphics.rendererEnum]}`, new Vector2(0, 60));
                this.DrawCrosshar();
            }
        });
    }
    GameLoop(now) {
        this.frameDelta = this.lastTimeStamp != 0 ? (now - this.lastTimeStamp) / 1000 : 1 / 60;
        if (this.changeApi) {
            if (Graphics.rendererEnum == Graphics.RendererEnum.Canvas2D) {
                Graphics.Init(Graphics.RendererEnum.WebGL);
            }
            else {
                Graphics.Init(Graphics.RendererEnum.Canvas2D);
            }
            this.changeApi = false;
        }
        this.player.Update(this, this.frameDelta);
        Graphics.BeginFrame();
        this.DrawWorld();
        Graphics.EndFrame();
        this.lastTimeStamp = now;
        window.requestAnimationFrame(this.GameLoop.bind(this));
    }
    DrawCrosshar() {
        const color = Color.Black();
        const distanceFromMiddle = 20 * Graphics.scaleRatio;
        Graphics.DrawGuiLine(new Vector2(Graphics.halfWidth - distanceFromMiddle, Graphics.halfHeight), new Vector2(Graphics.halfWidth + distanceFromMiddle, Graphics.halfHeight), 5, color);
        Graphics.DrawGuiLine(new Vector2(Graphics.halfWidth, Graphics.halfHeight - distanceFromMiddle), new Vector2(Graphics.halfWidth, Graphics.halfHeight + distanceFromMiddle), 5, color);
    }
    DrawWorld() {
        let rayCount = Graphics.canvas.width;
        if (Graphics.rendererEnum == Graphics.RendererEnum.Canvas2D)
            rayCount /= 12;
        const forwardDirection = new Vector2(Math.cos(Maths.Deg2Rad(this.player.yaw)), -Math.sin(Maths.Deg2Rad(this.player.yaw)));
        const rightDirection = new Vector2(-forwardDirection.y, forwardDirection.x);
        let rayPosition = this.player.position.Copy();
        const playerPitch = Maths.Deg2Rad(this.player.pitch) * 2;
        Graphics.SetLineWidth((Graphics.canvas.width / rayCount) + 2);
        for (let rayIndex = 0; rayIndex < rayCount; rayIndex++) {
            const interpolationCoefficient = 2.0 * rayIndex / rayCount - 1.0;
            const rayDirection = new Vector2(forwardDirection.x + interpolationCoefficient * rightDirection.x, forwardDirection.y + interpolationCoefficient * rightDirection.y);
            const mapPosition = new Vector2(Math.floor(rayPosition.x), Math.floor(rayPosition.y));
            let deltaDist = new Vector2();
            let sideDist = new Vector2();
            let step = new Vector2();
            let side = 0;
            if (Math.abs(rayDirection.x) < 1e-8) {
                deltaDist.x = 1e8;
            }
            else {
                deltaDist.x = Math.abs(1 / rayDirection.x);
            }
            if (Math.abs(rayDirection.y) < 1e-8) {
                deltaDist.y = 1e8;
            }
            else {
                deltaDist.y = Math.abs(1 / rayDirection.y);
            }
            if (rayDirection.x < 0) {
                step.x = -1;
                sideDist.x = (rayPosition.x - mapPosition.x) * deltaDist.x;
            }
            else {
                step.x = 1;
                sideDist.x = (mapPosition.x + 1 - rayPosition.x) * deltaDist.x;
            }
            if (rayDirection.y < 0) {
                step.y = -1;
                sideDist.y = (rayPosition.y - mapPosition.y) * deltaDist.y;
            }
            else {
                step.y = 1;
                sideDist.y = (mapPosition.y + 1 - rayPosition.y) * deltaDist.y;
            }
            let hit = 0;
            while (hit == 0) {
                if (sideDist.x < sideDist.y) {
                    sideDist.x += deltaDist.x;
                    mapPosition.x += step.x;
                    side = 0;
                }
                else {
                    sideDist.y += deltaDist.y;
                    mapPosition.y += step.y;
                    side = 1;
                }
                hit = this.map[mapPosition.y][mapPosition.x];
            }
            let wallDistance = 0;
            if (side == 0)
                wallDistance = Math.abs(sideDist.x - deltaDist.x);
            else
                wallDistance = Math.abs(sideDist.y - deltaDist.y);
            let wallHeight = 0.5 / wallDistance;
            let fromColor = new Color(0.9, 0.9, 0.9);
            let toColor = new Color(0.95, 0.95, 0.95);
            if (side == 1) {
                fromColor.Mul(0.9);
                toColor.Mul(0.9);
            }
            Graphics.DrawLine(new Vector2(interpolationCoefficient, wallHeight + playerPitch), new Vector2(interpolationCoefficient, -wallHeight + playerPitch), fromColor, toColor);
            Graphics.DrawLine(new Vector2(interpolationCoefficient, -1), new Vector2(interpolationCoefficient, -wallHeight + playerPitch), new Color(0.4, 0.4, 0.4), new Color(0.2, 0.2, 0.2));
        }
    }
}
