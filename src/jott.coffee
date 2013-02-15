fs              = require 'fs'
sys             = require 'sys'
cli             = require 'cli'

VERSION = require './VERSION'

CWD         = process.cwd()

quitWithMsg = (message) ->
	stamp(message)
	process.exit()

createProject = () ->
	console.log "Create Project"

createBlog = () ->
	console.log "Create Blog"

exports.run = (args, options) ->
	if options.version
		quitWithMsg("Jott v#{ VERSION }")

	if options.init
		createProject()
	else if options.new
		createBlog()

