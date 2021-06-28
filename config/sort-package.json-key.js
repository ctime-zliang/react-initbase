const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, '../package.json'), function (err, data) {
	if (err) {
		console.log(`Read File Error`, err)
		return
	}
	const sourcePkgData = JSON.parse(data)
	const sourceDevDpObject = sourcePkgData['devDependencies']
	const newPkgData = { ...sourcePkgData }
	newPkgData['devDependencies'] = {}
	Object.keys(sourceDevDpObject)
		.sort()
		.forEach((item, index) => {
			newPkgData['devDependencies'][item] = sourceDevDpObject[item]
		})
	fs.writeFileSync(path.join(__dirname, './sort-package.json'), JSON.stringify(newPkgData, null, '\t'))
})
