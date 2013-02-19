fs              = require 'fs-extra'
sys             = require 'sys'
CoffeeScript    = require 'coffee-script'
walk            = require 'walk'

compileScriptFile = (from, to) ->
    sys.puts("Compiling script: #{ from }")
    script_source = fs.readFileSync(from)
    compiled = CoffeeScript.compile(script_source.toString())
    fs.writeFileSync(to.replace('.coffee', '.js'), compiled)

task 'build', 'Compile src/*.coffee > lib/*.js', ->
    walker = walk.walk('src')
    walker.on 'file', (root, fileStats, next) ->
        if not /.swp$/.test(fileStats.name)
            compileScriptFile('src/' + fileStats.name, 'lib/' + fileStats.name)
        next()
