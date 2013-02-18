path			= require 'path'
fs              = require 'fs-extra'
{exec} 			= require 'child_process'
prompt			= require 'cli-prompt'
moment			= require 'moment'
entities		= require 'entities'

process.title = 'jott'

projectDir = path.resolve(process.cwd(), './')

jottOptions = {}

log = console.log

createProject = () ->
	settingsJSON = {}
	prompt "Enter your Blog's name: ", (name, end) =>
		settingsJSON.title = entities.encode name
		prompt "Enter your Blog's base URL, eg: \"localhost/blogtest\" or \"www.joeblogs.com\":", (url, end) =>
			settingsJSON.baseUrl = 'http://' + url
			end()
			fs.writeJson projectDir + '/jott.json', settingsJSON, (err) =>
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
	fs.readJson projectDir + '/jott.json', (err, jsonObject) =>
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

createBlogPost = () ->
	postTitle = ""
	prompt 'Enter your new blog/post/page title: ', (title, end, err) =>
		if err
			log err
			throw err
		postTitle = title
		end()
		dateString = moment().format('MMMM Do YYYY')
		string = 'include ../templates/postHead\n
\n
article\n
    .container\n
        h3 ' + postTitle + '\n
        p\n
        h5.metadata Posted on ' + dateString + '\n
        hr\n

include ../templates/footer\n'
		fs.outputFile projectDir + '/src/jade/posts/' + postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '') + '.jade', string, (err) =>
			if err
				log err
				throw err
			exec 'echo "mixin link(\'' + entities.encode(postTitle) + '\', \'' + postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '') + '\')"|cat - src/jade/items.jade  > /tmp/out && mv /tmp/out src/jade/items.jade', (err, stdout, stderr) ->
				if err
					log err
					throw err
				log 'Blog added to index'
			log 'New Post "' + postTitle + '" Created'


# commands
module.exports =
	post: ->
		createBlogPost()
	init: ->
		createProject()
	build: ->
		compileSource()
