# Jott

*v0.1.0*

[Jott](https://github.com/jonsherrard/jott) is a static site or blog generating tool for node.js.

## Installation

Jott is a command-line tool built for [Node](http://nodejs.org/), it's written in [CoffeeScript](http://coffeescript.org), and is available through [npm](https://npmjs.org/).

    $ sudo npm install -g jott

Jott needs to be installed globally using `-g` so it can create the necessary command in `/usr/local/bin`.

## Usage

### Init

	$ mkdir test_blog
	$ cd test_blog
    $ jott init

    $ Enter your Blog's name
	$ -> <name>
    $ Enter your Blog's Base URL,
	$ Eg: "localhost/blogtest" or "www.joeblogs.com" 
	$ (This can be changed in jott.json at anytime.) 
	$ http://<url>

Initalizes the Jott blog by creating the basic blog structure and saving a blog name and base URL in the jott.json settings file. 

    test_blog/
		src/
			jade/
				header.jade		- the jade template for the header
				index.jade		- the jade template for the index page
				items.jade		- the list of all the posts so far
				posts/			- the directory containing the posts in jade
				templates/
					footer.jade		- the jade template for the footer of each post
					list.jade		- jade mixin for creating the index list of posts
					post.jade		- a blank post template (N.B the 'jott post' command creates posts automatically)
			styl/
				style.styl		- stylus file for theming
		posts/		- folder containg the rendered html for the site
		www/		- public web folder, can contain images and js as well as compiled css
			css/
				reset.css		- actually a copy of normalize.css
				style.css		- generated css file from stylus
				c.min.js		- minified and concatenated of both files
		jott.json	- JSON configuration file

### New Post

	$ jott post

	$ Enter your new blog/post/page title:
	$ -> <title>
	$ New Post "<title>" Created  
	$ Blog added to index

The newly created post will be available in the src/jade/posts/ folder

    $ cd src/jade/posts
	$ vim <title>.jade

### Build

	$ jott build

The jott build command will compile your posts, index and stylus, along with the settings in jott.json. An index.html file will be in the project root, and all the posts will be in the 'posts' folder.

### Google Analytics

	$ jott ga

	$ Enter your Google Analytics tracking code.
	$ Format: UA-12345678-0
	$ -> <code>

If you have a free [Google Analytics](http://www.google.com/analytics/) account, you can add your tracking number to all pages and posts with the jott ga command.

## Author

* [Jonathon Sherrard](https://github.com/jonsherrard) ([jonsherrard.com](http://jonsherrard.com)]

## License

Unlicensed aka Public Domain. See [/UNLICENSE](https://github.com/jonsherrard/jott/blob/master/UNLICENSE) for more information.

