export class ShaderProgram {
	private vertexShader: WebGLShader;
	private fragmentShader: WebGLShader;
	private program: WebGLProgram;

	constructor(gl: WebGLRenderingContext, vertSrc: string, fragSrc: string) {
		this.program = gl.createProgram() as WebGLProgram;
		this.vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
		this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

		if(!this.CompileShader(gl, this.vertexShader, vertSrc, 'vertex')) return;
		if(!this.CompileShader(gl, this.fragmentShader, fragSrc, 'fragment')) return;

		gl.attachShader(this.program, this.vertexShader);
		gl.attachShader(this.program, this.fragmentShader);
		gl.linkProgram(this.program);
		if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.error(`Error linking shader program`, gl.getProgramInfoLog(this.program));
			return;
		}

		gl.validateProgram(this.program);
		if(!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
			console.error(`Error valdiating shader program`, gl.getProgramInfoLog(this.program));
			return;
		}
	}

	private CompileShader(gl: WebGLRenderingContext, shader: WebGLShader, src: string, type: string): boolean {
		gl.shaderSource(shader, src);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(`Error compiling ${type} shader`, gl.getShaderInfoLog(shader));
			return false;
		}

		return true;
	}

	public GetProgram(): WebGLProgram {
		return this.program;
	}

	public Bind(gl: WebGLRenderingContext): void {
		gl.useProgram(this.program);
	}
}
