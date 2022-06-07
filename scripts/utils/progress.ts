import readline from 'readline'

const __process: any = process

export function animateProgress(message: string = '', amountOfDots = 3): any {
	let i: number = 0
	return setInterval((): void => {
		readline.cursorTo(__process.stdout, 0)
		i = (i + 1) % (amountOfDots + 1)
		const dots: string = new Array(i + 1).join('.')
		__process.stdout.write(message + dots)
	}, 500) as any
}
