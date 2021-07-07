import readline from 'readline'

// @ts-ignore
const __process: any = process

export function animateProgress(message: string = '', amountOfDots = 3) {
	let i = 0
	return setInterval(() => {
		readline.cursorTo(__process.stdout, 0)
		i = (i + 1) % (amountOfDots + 1)
		const dots = new Array(i + 1).join('.')
		__process.stdout.write(message + dots)
	}, 500)
}
