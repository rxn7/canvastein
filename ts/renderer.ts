import { Vector2 } from './vector2.js';
import { Color } from './color.js';

export class Renderer {
	public BeginFrame(): void {}
	public EndFrame(): void {}
	public DrawLine(_from: Vector2, _to: Vector2, _fromColor: Color, _toColor: Color): void {}
	public OnResize(_width: number, _height: number): void {}
	public HasInitialized(): boolean { return false; }
}
