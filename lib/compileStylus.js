(function() {
  var exec, fs, path, stylus;

  exec = require('child_process').exec;

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
            console.log(css);
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

  /*
  	exer 'stylus -c -o ' + projectDir + '/www/css ' + projectDir + '/src/styl/style.styl', (err, stdout, stderr) ->
  		if err
  			log err
  			throw err
  		exec 'cat www/css/reset.css www/css/style.css www/css/prettify.css > www/css/c.min.css', (err, stdout, stderr) ->
  			if err
  				log err
  				throw err
  			exec 'cleancss -o www/css/c.min.css www/css/c.min.css', (err, stdout, stderr) ->
  				err && throw err
  				console.log 'Stylus Compiled'
  */


}).call(this);
