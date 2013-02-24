fs					= require 'fs-extra'
path				= require 'path'

projectDir	= path.resolve(process.cwd(), './')

module.exports = () =>
	fs.readJson projectDir + '/jott.json', (err, jsonObject) =>
		if err
			console.log err
			throw err
		jottOptions = jsonObject
		require('./compileJade')(jottOptions)


