path			= require 'path'
fs              = require 'fs-extra'
util			= require 'util'
cli             = require 'cli'
stylus			= require 'stylus'
jade			= require 'jade'
{exec} 			= require 'child_process'
prompt			= require 'cli-prompt'

projectDir = path.resolve(process.cwd(), './')

jottOptions = {}

log = console.log

VERSION = require './VERSION'

CWD         = process.cwd()

quitWithMsg = (message) ->
	console.log message
	process.exit()

createProject = () ->
	settingsJSON = {}
	prompt "Enter your Blog's name: ", (name, end) =>
		settingsJSON.title = name
		prompt "Enter your Blog's base URL, eg: \"localhost/blogtest\" or \"www.joeblogs.com\":", (url, end) =>
			settingsJSON.baseUrl = 'http://' + url
			end()
			fs.writeJson projectDir + '/settings.json', settingsJSON, (err) =>
				if settingsJSON.baseUrl is ''
					settingsJSON.baseUrl = 'http://localhost/' + path.basename(path.dirname(require.main.filename))
				log err if err
				# Create posts folder
				createFolders(name)

createFolders = (name) ->

	# Make sure of project directory
	projectDir = path.resolve(process.cwd(), './')
	# Defines the skeleton path
	templateDir = path.resolve(__dirname, '../skeleton/')
	
	# Copy the skeleton directory from the node_module to project directory
	fs.copy templateDir, projectDir, (err) ->
		if err
			console.log err
		else
			console.log 'Your blog ' + name + ' has been created.'
			compileSource()

compileSource = () ->
	compileStylus()
	readSettings()

compileStylus = () ->
	projectDir = path.resolve(process.cwd(), './')
	exec 'stylus -c -o ' + projectDir + '/www/css ' + projectDir + '/src/styl/style.styl', (err, stdout, stderr) ->
		log err if err
		console.log 'Stylus Compiled'

readSettings = () =>
	fs.readJson projectDir + '/settings.json', (err, jsonObject) =>
		if err
			log err
			throw err
		jottOptions = jsonObject
		compileJade()

compileJade = () =>
	# Compile Index
	options = jottOptions
	
	optionsString = JSON.stringify options

	projectDir = path.resolve(process.cwd(), './')

	# Compile Posts
	postExecString = 'jade -o \'' + optionsString + '\' -O ' + projectDir + '/posts/ '+ projectDir + '/src/jade/posts/*'
	exec postExecString, (err, stdout, stderr) ->
		log err if err
		console.log 'Posts Compiled'

	indexExecString = 'jade -o \'' + optionsString  + '\' -O ' + projectDir + ' ' + projectDir + '/src/jade/index.jade'
	exec indexExecString, (err, stdout, stderr) ->
		log err if err
		log 'Index Compiled'




createBlog = () ->
	console.log "Create Blog"

exports.run = (args, options) ->
	if options.version
		quitWithMsg("Jott v#{ VERSION }")
	if options.init
		createProject()
	else if options.new
		createBlog()
	else if options.compile
		compileSource()

