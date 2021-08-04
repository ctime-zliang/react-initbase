import chalk from 'chalk'

export const logger = {
	trace(message: any) {
		console.log(`[${new Date().toISOString()}]`, chalk['blue'](message))
	},
	info(message: any) {
		console.log(`[${new Date().toISOString()}]`, chalk['blue'](message))
	},
	warn(message: any) {
		console.log(`[${new Date().toISOString()}]`, chalk['yellow'](message))
	},
	error(message: any) {
		console.log(`[${new Date().toISOString()}]`, chalk['red'](message))
	},
	success(message: any) {
		console.log(`[${new Date().toISOString()}]`, chalk['green'](message))
	},
}

export const compilerPromise = (name: string, compiler: any, callback: Function = new Function()) => {
	return new Promise((resolve, reject) => {
		compiler.hooks.compile.tap(name, () => {
			logger.info(`[Info]: [${name}] Compiling...`)
			callback('compile', compiler)
		})
		compiler.hooks.done.tap(name, (stats: any) => {
			if (!stats.hasErrors()) {
				logger.info(`[Info]: [${name}] Compiled successfully.`)
				callback('done', compiler)
				resolve({ msg: null })
				return
			}
			reject({ msg: `Failed to Compile ${name}.` })
		})
	})
}
