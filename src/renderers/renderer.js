export class Renderer {
    constructor(rayCountMultiplier) {
        this.rayCountMultiplier = rayCountMultiplier;
        this.getRayCountMultiplier = () => this.rayCountMultiplier;
    }
    beginFrame(player) { }
    endFrame() { }
    drawLine(from, to, fromColor, toColor) { }
    onResize(width, height) { }
    hasInitialized() {
        return false;
    }
}
