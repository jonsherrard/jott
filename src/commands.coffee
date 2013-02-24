module.exports =
	init: ->
		require('./createProject')()
	build: ->
		require('./compileSource')()
	post: ->
		require('./createBlogPost')()
	ga: ->
		require('./addGoogleAnalytics')()
	

