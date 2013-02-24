path					= require 'path'
{exec}					= require 'child_process'

module.exports = (jottOptions) =>
	# Compile Index
	options = jottOptions
	
	optionsString = JSON.stringify options

	projectDir = path.resolve(process.cwd(), './')

	# Compile Posts
	postExecString = 'jade -o \'' + optionsString + '\' -O ' + projectDir + '/posts/ '+ projectDir + '/src/jade/posts/*'
	exec postExecString, (err, stdout, stderr) ->
		if err
			console.log err
			throw err
		console.log 'Posts Compiled'

	indexExecString = 'jade -o \'' + optionsString  + '\' -O ' + projectDir + ' ' + projectDir + '/src/jade/index.jade'
	exec indexExecString, (err, stdout, stderr) ->
		if err
			console.log err
			throw err
		console.log 'Index Compiled'


