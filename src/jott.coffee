fs              = require 'fs'
sys             = require 'sys'
cli             = require 'cli'

VERSION = require './VERSION'

CWD         = process.cwd()

quitWithMsg = (message) ->
	console.log message
	process.exit()

createProject = () ->
	# Create posts folder
	fs.mkdir 'posts', (err, stdout, stderr) ->
		err && throw err
		console.log 'Created Posts folder.'
	
	fs.mkdirSync 'src', (err, stdout, stderr) ->
		err && throw err
		console.log 'Created src folder.'

createBlog = () ->
	console.log "Create Blog"

exports.run = (args, options) ->
	if options.version
		quitWithMsg("Jott v#{ VERSION }")

	if options.init
		createProject()
	else if options.new
		createBlog()

