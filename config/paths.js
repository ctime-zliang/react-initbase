const path = require('path')
const utils = require('./utils')

module.exports = {
	srcClient: utils.resolveDirectory(`./src/client`),
	srcServer: utils.resolveDirectory(`./src/server`),
	srcApp: utils.resolveDirectory(`./src/app`),
}
