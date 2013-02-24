{exec}					= require 'child_process'
path					= require 'path'

module.exports = () ->
	projectDir = path.resolve(process.cwd(), './')
	exec 'stylus -c -o ' + projectDir + '/www/css ' + projectDir + '/src/styl/style.styl', (err, stdout, stderr) ->
		if err
			log err
			throw err
		exec 'cat www/css/reset.css www/css/style.css www/css/prettify.css > www/css/c.min.css', (err, stdout, stderr) ->
			if err
				log err
				throw err
			exec 'cleancss -o www/css/c.min.css www/css/c.min.css', (err, stdout, stderr) ->
				err && throw err
				console.log 'Stylus Compiled'



