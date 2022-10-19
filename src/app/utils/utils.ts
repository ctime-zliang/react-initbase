// ;(window as any).__globalIndex = Math.random()

// Object.defineProperty(Array.prototype, 'sum', {
// 	value: function () {
// 		return this.reduce((sum: number, num: number): number => (sum += num), 0)
// 	},
// })

export async function sleep(delay: number = 500, ...args: any): Promise<any> {
	return new Promise(_ => {
		window.setTimeout(() => {
			_(args)
		}, +delay)
	})
}
