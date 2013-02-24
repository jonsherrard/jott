(function() {
  var fs, path, projectDir,
    _this = this;

  fs = require('fs-extra');

  path = require('path');

  projectDir = path.resolve(process.cwd(), './');

  module.exports = function() {
    return fs.readJson(projectDir + '/jott.json', function(err, jsonObject) {
      var jottOptions;
      if (err) {
        console.log(err);
        throw err;
      }
      jottOptions = jsonObject;
      return require('./compileJade')(jottOptions);
    });
  };

}).call(this);
