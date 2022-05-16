import { Renderer } from '../renderer.js';
import { canvas, clearColor, lineWidth } from '../graphics.js';
import { ShaderProgram } from '../shader.js';
export class WebGLRenderer extends Renderer {
    constructor() {
        super();
        this.lines = [];
        this.lineBuffer = 0;
        this.gl = canvas.getContext('webgl');
        if (!this.gl) {
            this.initialized = false;
            alert('Your platform doesn\'t support WebGL');
        }
        const lineVertShaderSource = 'precision mediump float;' +
            'attribute vec2 aPosition;' +
            'attribute vec3 aColor;' +
            'varying vec4 fragColor;' +
            'void main() {' +
            '	fragColor = vec4(aColor, 1.0);' +
            '	gl_Position = vec4(aPosition, 0.0, 1.0);' +
            '}';
        const lineFragShaderSource = 'precision mediump float;' +
            'varying vec4 fragColor;' +
            'void main() {' +
            '	gl_FragColor = fragColor;' +
            '}';
        this.lines = new Array();
        this.lineBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer);
        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        this.gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
        this.gl.lineWidth(1);
        this.lineShader = new ShaderProgram(this.gl, lineVertShaderSource, lineFragShaderSource);
        this.initialized = true;
    }
    HasInitialized() {
        return this.initialized;
    }
    BeginFrame() {
        this.lines = [];
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.lineWidth(lineWidth);
    }
    EndFrame() {
        var _a;
        (_a = this.lineShader) === null || _a === void 0 ? void 0 : _a.Bind(this.gl);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lineBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.lines), this.gl.STATIC_DRAW);
        this.gl.drawArrays(this.gl.LINES, 0, this.lines.length / 5);
    }
    DrawLine(from, to, fromColor, toColor) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        (_a = this.lines) === null || _a === void 0 ? void 0 : _a.push(from.x);
        (_b = this.lines) === null || _b === void 0 ? void 0 : _b.push(from.y);
        (_c = this.lines) === null || _c === void 0 ? void 0 : _c.push(fromColor.r);
        (_d = this.lines) === null || _d === void 0 ? void 0 : _d.push(fromColor.g);
        (_e = this.lines) === null || _e === void 0 ? void 0 : _e.push(fromColor.b);
        (_f = this.lines) === null || _f === void 0 ? void 0 : _f.push(to.x);
        (_g = this.lines) === null || _g === void 0 ? void 0 : _g.push(to.y);
        (_h = this.lines) === null || _h === void 0 ? void 0 : _h.push(toColor.r);
        (_j = this.lines) === null || _j === void 0 ? void 0 : _j.push(toColor.g);
        (_k = this.lines) === null || _k === void 0 ? void 0 : _k.push(toColor.b);
    }
    OnResize(_width, _height) {
        this.gl.viewport(0, 0, _width, _height);
    }
}
