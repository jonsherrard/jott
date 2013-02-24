prompt 				= require 'cli-prompt'
entities			= require 'entities'
fs					= require 'fs-extra'
moment				= require 'moment'
path				= require 'path'
{exec}				= require 'child_process'

# Get working directory
projectDir = path.resolve(process.cwd(), './')

module.exports = () ->
	postTitle = ""
	prompt 'Enter your new blog/post/page title:\n-> ', (title, end, err) =>
		if err
			console.log err
			throw err
		postTitle = title
		end()
		dateString = moment().format('MMMM Do YYYY')
		string = 'include ../templates/head\n
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
				console.log err
				throw err
			exec 'echo "mixin link(\'' + entities.encode(postTitle) + '\', \'' + postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '') + '\')"|cat - src/jade/items.jade  > /tmp/out && mv /tmp/out src/jade/items.jade', (err, stdout, stderr) ->
				if err
					console.log err
					throw err
				console.log 'Blog added to index'
			console.log 'New Post "' + postTitle + '" created at:\nsrc/jade/posts/' + postTitle+ '.jade'


