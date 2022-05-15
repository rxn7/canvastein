import { RenderingApi } from './rendering_api.js';
import { canvas } from './renderer.js';
import { ShaderProgram } from './shader.js';
export class WebGLApi extends RenderingApi {
    constructor() {
        super();
        this.gl = canvas.getContext('webgl');
        if (!this.gl) {
            this.initialized = false;
            alert('Your platform doesn\'t support WebGL');
        }
        const lineVertShaderSource = 'precision mediump float;' +
            'attribute vec2 aPosition;' +
            'attribute vec3 aColor;' +
            'varying vec3 fragColor;' +
            'void main() {' +
            '	fragColor = aColor;' +
            '	gl_Position = vec4(aPosition, 0.0, 1.0);' +
            '}';
        const lineFragShaderSource = 'precision mediump float;' +
            'varying vec3 fragColor;' +
            'void main() {' +
            '	gl_FragColor = vec4(fragColor, 1.0);' +
            '}';
        this.lines = new Array();
        this.lineBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer);
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        this.gl.clearColor(0, 0, 1, 1);
        this.gl.lineWidth(1.15);
        this.lineShader = new ShaderProgram(this.gl, lineVertShaderSource, lineFragShaderSource);
        this.initialized = true;
    }
    HasInitialized() {
        return this.initialized;
    }
    BeginFrame() {
        this.lines = [];
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    EndFrame() {
        this.lineShader.Bind(this.gl);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.lines), this.gl.STATIC_DRAW);
        this.gl.drawArrays(this.gl.LINES, 0, this.lines.length / 5);
    }
    DrawLine(from, to, fromColor, toColor) {
        this.lines.push(from.x);
        this.lines.push(from.y);
        this.lines.push(fromColor.r);
        this.lines.push(fromColor.g);
        this.lines.push(fromColor.b);
        this.lines.push(to.x);
        this.lines.push(to.y);
        this.lines.push(toColor.r);
        this.lines.push(toColor.g);
        this.lines.push(toColor.b);
    }
    OnResize(_width, _height) {
        this.gl.viewport(0, 0, _width, _height);
    }
}