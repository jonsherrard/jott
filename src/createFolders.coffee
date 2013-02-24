path				= require 'path'
fs					= require 'fs-extra'

module.exports = (name) ->

	# Make sure of project directory
	projectDir = path.resolve(process.cwd(), './')
	# Defines the skeleton path
	templateDir = path.resolve(__dirname, '../skeleton/')

	fs.mkdirs projectDir + '/posts/', (err) ->
		if err
			console.log err
			throw err
		console.log 'Posts directory created'
	
	# Copy the skeleton directory from the node_module to project directory
	fs.copy templateDir, projectDir, (err) ->
		if err
			console.log err
		else
			console.log 'Your blog ' + name + ' has been created.'


