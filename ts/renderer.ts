import { Vector2 } from './vector2.js';
import { Color } from './color.js';
import { ShaderProgram } from './shader.js';

export const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
export const gl: WebGL2RenderingContext = canvas.getContext('webgl') as WebGL2RenderingContext;

let halfHeight: number = 0;
let halfWidth: number = 0;

let lines: Array<number>;
let lineBuffer: WebGLBuffer;
let lineShader: ShaderProgram;

export function Init() {
	if(!gl) {
		alert('Your browser does not support WebGL');
		return;
	}

	InitLineRenderer();
}

function InitLineRenderer() {
	const lineVertShaderSource: string =
		'precision mediump float;' +
		'attribute vec2 aPosition;' +
		'attribute vec3 aColor;' +
		'varying vec3 fragColor;' +
		'void main() {' +
		'	fragColor = aColor;' +
		'	gl_Position = vec4(aPosition, 0.0, 1.0);' +
		'}';

	const lineFragShaderSource: string =
		'precision mediump float;' +
		'varying vec3 fragColor;' +
		'void main() {' +
		'	gl_FragColor = vec4(fragColor, 1.0);' +
		'}';

	lines = new Array<number>();
	lineBuffer = gl.createBuffer() as WebGLBuffer;
	gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0); // aPosition
	gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT); // aColor

	lineShader = new ShaderProgram(gl, lineVertShaderSource, lineFragShaderSource);
}

export function AddLine(from: Vector2, to: Vector2, fromColor: Color, toColor: Color) {
	lines.push(from.x);
	lines.push(from.y);
	lines.push(fromColor.r);
	lines.push(fromColor.g);
	lines.push(fromColor.b);
	lines.push(to.x);
	lines.push(to.y);
	lines.push(toColor.r);
	lines.push(toColor.g);
	lines.push(toColor.b);
}

export function BeginFrame(): void {
	lines = [];
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.lineWidth(1);
}

export function EndFrame(): void {
	lineShader.Bind(gl);
	gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW);
	gl.drawArrays(gl.LINES, 0, lines.length / 2);
}

export function SetCanvasSize(width: number = 1920, height: number = 1080): void {
	canvas.width = width;
	canvas.height = height;

	halfWidth = width / 2;
	halfHeight = height / 2;
	
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

window.addEventListener('resize', () => {
	SetCanvasSize(window.innerWidth, window.innerHeight);
});

export function GetHalfWidth(): number { return halfWidth; }
export function GetHalfHeight(): number { return halfHeight; }
