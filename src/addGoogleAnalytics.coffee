fs				= require 'fs-extra'
path			= require 'path'
prompt			= require 'cli-prompt'


module.exports = () ->
	
	projectDir = path.resolve(process.cwd(), './')

	fs.readJson projectDir + '/jott.json', (err, jsonObject) =>
		if err
			console.log err
			throw err
		jottOptions = jsonObject
		prompt 'Enter your Google Analytics tracking code.\nFormat: UA-12345678-0\n-> ', (code, end, err) =>
			if err
				console.log err
				throw err
			jottOptions.googleAnalytics = code
			end()
			fs.writeJson projectDir + '/jott.json', jottOptions, (err) =>
				if err
					console.log err
					throw err
				console.log 'Google Analytics Added'


