# Jott

*v0.1.0*

[Jott](https://github.com/jonsherrard/jott) is a static site or blog generating tool for node.js.

## Preamble

This is my first *real* project, therefore it may be a bit rubbish in places. Please do email me at &#106;&#111;&#110;&#064;&#097;&#110;&#100;&#116;&#104;&#097;&#116;&#115;&#046;&#105;&#116;, or send a pull request, if you see anything glaringly awful.

Jott uses Jade for templating and Jade only. I prefer to use explicit references to the HTML tags that I work with all day. It will probably never support markdown. [Jade](https://github.com/visionmedia/jade#readme) is incredibly simple and quick to pick up.

### Philosophy

Jott was born from my reluctance to blog using any webapps or self-hosted blogging software, some of my thoughts on the matter of blogging are articulated far better than I ever could by [@biesnecker](https://twitter.com/biesnecker) [here](http://www.dev.gd/20130211-your-blog-navigation-is-superfluous.html) and [here](http://www.dev.gd/20130212-minimum-viable-blog.html).

**Summary**

- I don't want distract myself from writing by worrying about Categories or Tags.
- I don't want to wrestle with web based text editors to write, especially when I'm comfortable with HTML/Jade.
- A navigation is not neccessary, there is a list of all articles at the site index.
- The site should be highly performant, containing little to zero JavaScript and a small amount of CSS.
- Generates static HTML.
- Manipulated via the Command Line, where I spend most of my time.

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

The 'jott build' command will compile your posts, index and stylus, along with the settings in jott.json. An index.html file will appear in the project root, and all the posts will be in the 'posts' folder.

### Google Analytics

	$ jott ga

	$ Enter your Google Analytics tracking code.
	$ Format: UA-12345678-0
	$ -> <code>

If you have a free [Google Analytics](http://www.google.com/analytics/) account, you can add your tracking number to all pages and posts with the 'jott ga' command.

## Author

* [Jonathon Sherrard](https://github.com/jonsherrard) ([jonsherrard.com](http://jonsherrard.com)]

## License

Unlicensed aka Public Domain. See [/UNLICENSE](https://github.com/jonsherrard/jott/blob/master/UNLICENSE) for more information.

