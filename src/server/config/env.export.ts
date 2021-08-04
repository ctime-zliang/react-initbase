import devCfg from './env-config/development.config'
import preCfg from './env-config/prerelease.config'
import proCfg from './env-config/production.config'

const NODE_ENV: string = process.env.NODE_ENV || 'development'

export default {
	development: devCfg,
	test: null,
	prerelease: preCfg,
	production: proCfg,
}[NODE_ENV]
