export class ShaderProgram {
    constructor(gl, vertSrc, fragSrc) {
        this.program = gl.createProgram();
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        if (!this.CompileShader(gl, this.vertexShader, vertSrc, 'vertex'))
            return;
        if (!this.CompileShader(gl, this.fragmentShader, fragSrc, 'fragment'))
            return;
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error(`Error linking shader program`, gl.getProgramInfoLog(this.program));
            return;
        }
        gl.validateProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
            console.error(`Error valdiating shader program`, gl.getProgramInfoLog(this.program));
            return;
        }
    }
    CompileShader(gl, shader, src, type) {
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Error compiling ${type} shader`, gl.getShaderInfoLog(shader));
            return false;
        }
        return true;
    }
    GetProgram() {
        return this.program;
    }
    Bind(gl) {
        gl.useProgram(this.program);
    }
}
