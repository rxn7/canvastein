import { Vector2 } from '../vector2.js'
import { Color } from '../color.js'
import { Player } from '../player.js'

export class Renderer {
	public beginFrame(_player: Player): void {}
	public endFrame(): void {}
	public drawLine(_from: Vector2, _to: Vector2, _fromColor: Color, _toColor: Color): void {}
	public onResize(_width: number, _height: number): void {}
	public hasInitialized(): boolean {
		return false
	}
}
