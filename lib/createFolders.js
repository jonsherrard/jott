(function() {
  var fs, path;

  path = require('path');

  fs = require('fs-extra');

  module.exports = function(name) {
    var projectDir, templateDir;
    projectDir = path.resolve(process.cwd(), './');
    templateDir = path.resolve(__dirname, '../skeleton/');
    fs.mkdirs(projectDir + '/posts/', function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      return console.log('Posts directory created');
    });
    return fs.copy(templateDir, projectDir, function(err) {
      if (err) {
        return console.log(err);
      } else {
        return console.log('Your blog ' + name + ' has been created.');
      }
    });
  };

}).call(this);
