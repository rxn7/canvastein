import { Vector2 } from '../vector2.js'
import { Color } from '../color.js'
import { Player } from '../player.js'

export class Renderer {
	protected constructor(protected rayCountMultiplier: number) {}

	public beginFrame(player: Player): void {}
	public endFrame(): void {}
	public drawLine(from: Vector2, to: Vector2, fromColor: Color, toColor: Color): void {}
	public onResize(width: number, height: number): void {}
	public hasInitialized(): boolean {
		return false
	}

	public getRayCountMultiplier = (): number => this.rayCountMultiplier
}
