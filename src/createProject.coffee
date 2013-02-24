prompt				= require 'cli-prompt'
fs					= require 'fs-extra'
createFolders		= require './createFolders'
entities			= require 'entities'
path				= require 'path'

# Get working directory
projectDir = path.resolve(process.cwd(), './')

module.exports = () ->
	console.log 'Create Project'
	settingsJSON = {}
	prompt "Enter your Blog's name\n-> ", (name, end) =>
		settingsJSON.title = entities.encode name
		prompt "Enter your Blog's Base URL,\nEg: \"localhost/blogtest\" or \"www.joeblogs.com\" \n(This can be changed in jott.json at anytime.)\nhttp://", (url, end) =>
			settingsJSON.baseUrl = 'http://' + url
			end()
			if settingsJSON.baseUrl is 'http://'
				settingsJSON.baseUrl = 'http://localhost/' + path.basename(process.cwd())
			fs.writeJson projectDir + '/jott.json', settingsJSON, (err) =>
				log err if err
				# Create posts folder
				createFolders(name)

