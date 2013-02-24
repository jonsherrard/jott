(function() {
  var fs, path, stylus, uglifycss;

  path = require('path');

  stylus = require('stylus');

  fs = require('fs-extra');

  uglifycss = require('uglifycss');

  module.exports = function() {
    var projectDir, stylusFiles, uglifyCSS;
    projectDir = path.resolve(process.cwd(), './');
    stylusFiles = fs.readdir(projectDir + '/src/styl/', function(err, files) {
      if (err) {
        console.log(err);
        throw err;
      }
      return files.forEach(function(file) {
        var _this = this;
        return fs.readFile(projectDir + '/src/styl/' + file, function(err, data) {
          return stylus(data.toString()).set('filename', file).render(function(err, css) {
            if (err) {
              console.log(err);
              throw err;
            }
            return fs.writeFile(projectDir + '/www/css/style.css', css, function(err) {
              if (err) {
                console.log(err);
                throw err;
              }
              console.log('Stylus Compiled');
              return uglifyCSS();
            });
          });
        });
      });
    });
    return uglifyCSS = function() {
      var dir, files;
      dir = projectDir + '/www/css/';
      files = [dir + 'reset.css', dir + 'prettify.css', dir + 'style.css'];
      return fs.writeFile(dir + 'c.min.css', uglifycss.processFiles(files), function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
        return console.log('CSS Minified');
      });
    };
  };

}).call(this);
