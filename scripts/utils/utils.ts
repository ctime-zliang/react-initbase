import chalk from 'chalk'

export const logger = {
	trace(message: any): void {
		console.log(`[trace][${new Date().toISOString()}]`, chalk['blue'](message))
	},
	info(message: any): void {
		console.log(`[info][${new Date().toISOString()}]`, chalk['blue'](message))
	},
	warn(message: any): void {
		console.log(`[warn][${new Date().toISOString()}]`, chalk['yellow'](message))
	},
	error(message: any): void {
		console.log(`[error][${new Date().toISOString()}]`, chalk['red'](message))
	},
	success(message: any): void {
		console.log(`[success][${new Date().toISOString()}]`, chalk['green'](message))
	},
}

export interface ICompilerPromise {
	msg: string | null
}
export const compilerPromise = (name: string, compiler: any, callback: Function = new Function()): Promise<ICompilerPromise> => {
	return new Promise((resolve, reject): void => {
		compiler.hooks.compile.tap(name, () => {
			logger.info(`[${name}] Compiling...`)
			callback('compile', compiler)
		})
		compiler.hooks.done.tap(name, (stats: any): void => {
			if (!stats.hasErrors()) {
				console.log(`\n`)
				logger.info(`[${name}] Compiled Successfully ...^_^...`)
				callback('done', compiler)
				resolve({ msg: null })
				return
			}
			reject({ msg: `Failed to Compile ${name}.`, stats })
		})
	})
}
