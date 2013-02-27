(function() {
  var fs, jade, path,
    _this = this;

  path = require('path');

  fs = require('fs-extra');

  jade = require('jade');

  module.exports = function(jottOptions) {
    var compileIndex, compilePosts, locals, projectDir;
    locals = jottOptions;
    projectDir = path.resolve(process.cwd(), './');
    compilePosts = function(locals) {
      var jadeFiles;
      return jadeFiles = fs.readdir(projectDir + '/src/jade/posts/', function(err, files) {
        if (err) {
          console.log(err);
          throw err;
        }
        return files.forEach(function(file) {
          var fileName, input,
            _this = this;
          input = file;
          fileName = input.substr(0, input.lastIndexOf('.')) || input;
          return fs.readFile(projectDir + '/src/jade/posts/' + fileName + '.jade', function(err, data) {
            var compileFile, options;
            options = {
              filename: projectDir + '/src/jade/posts/' + fileName + '.jade',
              pretty: true
            };
            compileFile = jade.compile(data.toString(), options);
            return fs.writeFile(projectDir + '/posts/' + fileName + '.html', compileFile(locals), function(err) {
              if (err) {
                console.log(err);
                throw err;
              }
              return console.log(fileName + '.html compiled');
            });
          });
        });
      });
    };
    compileIndex = function(locals) {
      var _this = this;
      return fs.readFile(projectDir + '/src/jade/index.jade', function(err, data) {
        var options;
        options = {
          filename: projectDir + '/src/jade/index.jade',
          pretty: true
        };
        compileIndex = jade.compile(data.toString(), options);
        return fs.writeFile(projectDir + '/index.html', compileIndex(locals), function(err) {
          if (err) {
            console.log(err);
            throw err;
          }
          return console.log('index.html compiled');
        });
      });
    };
    compilePosts(locals);
    return compileIndex(locals);
  };

}).call(this);
