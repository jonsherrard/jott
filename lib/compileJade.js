(function() {
  var exec, path,
    _this = this;

  path = require('path');

  exec = require('child_process').exec;

  module.exports = function(jottOptions) {
    var indexExecString, options, optionsString, postExecString, projectDir;
    options = jottOptions;
    optionsString = JSON.stringify(options);
    projectDir = path.resolve(process.cwd(), './');
    postExecString = 'jade -o \'' + optionsString + '\' -O ' + projectDir + '/posts/ ' + projectDir + '/src/jade/posts/*';
    exec(postExecString, function(err, stdout, stderr) {
      if (err) {
        console.log(err);
        throw err;
      }
      return console.log('Posts Compiled');
    });
    indexExecString = 'jade -o \'' + optionsString + '\' -O ' + projectDir + ' ' + projectDir + '/src/jade/index.jade';
    return exec(indexExecString, function(err, stdout, stderr) {
      if (err) {
        console.log(err);
        throw err;
      }
      return console.log('Index Compiled');
    });
  };

}).call(this);
