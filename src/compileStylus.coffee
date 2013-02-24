path					= require 'path'
stylus 					= require 'stylus'
fs						= require 'fs-extra'

module.exports = () ->
	# Get project directory
	projectDir = path.resolve(process.cwd(), './')

	stylusFiles = fs.readdir projectDir + '/src/styl/', (err, files) ->
		if err
			console.log err
			throw err
		files.forEach (file) ->
			fs.readFile projectDir + '/src/styl/' + file, (err, data) =>
				stylus(data.toString())
					.set('filename', file)
					.render (err, css) ->
						if err
							console.log err
							throw err
						fs.writeFile projectDir + '/www/css/style.css', css, (err) ->
							if err
								console.log err
								throw err
							console.log 'Stylus Compiled'
