path			= require 'path'
fs              = require 'fs-extra'
util			= require 'util'
cli             = require 'cli'

VERSION = require './VERSION'

CWD         = process.cwd()

quitWithMsg = (message) ->
	console.log message
	process.exit()

createProject = () ->
	# Create posts folder
	createFolders()

createFolders = () ->

	projectDir = path.resolve(process.cwd(), './')
	templateDir = path.resolve(__dirname, '../skeleton/')
	
	fs.copy templateDir, projectDir, (err) ->
		if err
			console.log err
		else
			console.log 'Created Template'


createBlog = () ->
	console.log "Create Blog"

exports.run = (args, options) ->
	if options.version
		quitWithMsg("Jott v#{ VERSION }")

	if options.init
		createProject()
	else if options.new
		createBlog()

