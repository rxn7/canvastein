import { Renderer } from '../renderer.js';
import { canvas, clearColor, lineWidth } from '../graphics.js';
import { ShaderProgram } from '../shader.js';
import { Vector2 } from '../vector2.js';
import { Color } from '../color.js';

export class WebGLRenderer extends Renderer {
	private lines: Array<number> = [];
	private lineBuffer: WebGLBuffer = 0;
	private lineShader?: ShaderProgram;
	private gl: WebGLRenderingContext;
	private initialized: boolean;

	constructor() {
		super();
		this.initialized = true;
		this.gl = canvas.getContext('webgl') as WebGLRenderingContext;
		if(!this.gl) {
			this.initialized = false;
			alert('Your platform doesn\'t support WebGL');
		}

		if(this.initialized) {
			const lineVertShaderSource: string =
				'precision mediump float;' +
				'attribute vec2 aPosition;' +
				'attribute vec3 aColor;' +
				'varying vec4 fragColor;' +
				'void main() {' +
				'	fragColor = vec4(aColor, 1.0);' +
				'	gl_Position = vec4(aPosition, 0.0, 1.0);' +
				'}';

			const lineFragShaderSource: string =
				'precision mediump float;' +
				'varying vec4 fragColor;' +
				'void main() {' +
				'	gl_FragColor = fragColor;' +
				'}';

			this.lines = new Array<number>();
			this.lineBuffer = this.gl.createBuffer() as WebGLBuffer;
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer);
			this.gl.enableVertexAttribArray(0);
			this.gl.enableVertexAttribArray(1);
			this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0); // aPosition
			this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT); // aColor
			this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
			this.gl.lineWidth(1);
			this.lineShader = new ShaderProgram(this.gl, lineVertShaderSource, lineFragShaderSource);
		}
	}

	public HasInitialized(): boolean {
		return this.initialized 
	}

	public BeginFrame(): void {
		this.lines = [];
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.lineWidth(lineWidth);
	}

	public EndFrame(): void {
		this.lineShader?.Bind(this.gl);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer as WebGLBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.lines), this.gl.STATIC_DRAW);
		this.gl.drawArrays(this.gl.LINES, 0, this.lines.length / 5 /* 5 floats per point */);
	}

	public DrawLine(from: Vector2, to: Vector2, fromColor: Color, toColor: Color): void {
		this.lines?.push(from.x);
		this.lines?.push(from.y);
		this.lines?.push(fromColor.r);
		this.lines?.push(fromColor.g);
		this.lines?.push(fromColor.b);
		this.lines?.push(to.x);
		this.lines?.push(to.y);
		this.lines?.push(toColor.r);
		this.lines?.push(toColor.g);
		this.lines?.push(toColor.b);
	}

	public OnResize(_width: number, _height: number): void {
		this.gl.viewport(0, 0, _width, _height);
	}
}
