(function() {
  var exec, path;

  exec = require('child_process').exec;

  path = require('path');

  module.exports = function() {
    var projectDir;
    projectDir = path.resolve(process.cwd(), './');
    return exec('stylus -c -o ' + projectDir + '/www/css ' + projectDir + '/src/styl/style.styl', function(err, stdout, stderr) {
      if (err) {
        log(err);
        throw err;
      }
      return exec('cat www/css/reset.css www/css/style.css www/css/prettify.css > www/css/c.min.css', function(err, stdout, stderr) {
        if (err) {
          log(err);
          throw err;
        }
        return exec('cleancss -o www/css/c.min.css www/css/c.min.css', function(err, stdout, stderr) {
          err && (function() {
            throw err;
          })();
          return console.log('Stylus Compiled');
        });
      });
    });
  };

}).call(this);
