path					= require 'path'
fs						= require 'fs-extra'
jade					= require 'jade'


module.exports = (jottOptions) =>
	locals = jottOptions
	
	# Compile Posts
	projectDir = path.resolve(process.cwd(), './')
	compilePosts = (locals) ->
		jadeFiles = fs.readdir projectDir + '/src/jade/posts/', (err, files) ->
			if err
				console.log err
				throw err
			files.forEach (file) ->
				input = file
				fileName = input.substr(0, input.lastIndexOf('.')) || input
				fs.readFile projectDir + '/src/jade/posts/' + fileName + '.jade', (err, data) =>
					options =
						filename : projectDir + '/src/jade/posts/' + fileName + '.jade'
						pretty : true
					compileFile = jade.compile data.toString(), options
					fs.writeFile projectDir + '/posts/' + fileName + '.html', compileFile(locals), (err) ->
						if err
							console.log err
							throw err
						console.log fileName + '.html compiled'

	compileIndex = (locals) ->
		fs.readFile projectDir + '/src/jade/index.jade', (err, data) =>
			options =
				filename : projectDir + '/src/jade/index.jade'
				pretty : true
			compileIndex = jade.compile data.toString(), options
			fs.writeFile projectDir + '/index.html', compileIndex(locals), (err) ->
				if err
					console.log err
					throw err
				console.log 'index.html compiled'

	compilePosts(locals)
	compileIndex(locals)
