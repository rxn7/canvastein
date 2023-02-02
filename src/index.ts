import Clock from './clock.js'

const canvas: HTMLCanvasElement = document.createElement('canvas')
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
const clock: Clock = new Clock(ctx)

function init(): void {
	document.body.append(canvas)
	handleResize()
	requestAnimationFrame(animationFrame)
}

function animationFrame(time: DOMHighResTimeStamp): void {
	requestAnimationFrame(animationFrame)

	ctx.fillStyle = '#000'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	clock.render()
}

function handleResize(): void {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	clock.handleResize()
}

window.addEventListener('resize', ev => {
	handleResize()
})

init()
