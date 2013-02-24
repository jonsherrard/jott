(function() {
  var fs, path, stylus;

  path = require('path');

  stylus = require('stylus');

  fs = require('fs-extra');

  module.exports = function() {
    var projectDir, stylusFiles;
    projectDir = path.resolve(process.cwd(), './');
    return stylusFiles = fs.readdir(projectDir + '/src/styl/', function(err, files) {
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
              return console.log('Stylus Compiled');
            });
          });
        });
      });
    });
  };

}).call(this);
