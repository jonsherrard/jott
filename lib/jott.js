(function() {
  var CWD, VERSION, cli, createBlog, createFolders, createProject, fs, path, quitWithMsg, util;

  path = require('path');

  fs = require('fs-extra');

  util = require('util');

  cli = require('cli');

  VERSION = require('./VERSION');

  CWD = process.cwd();

  quitWithMsg = function(message) {
    console.log(message);
    return process.exit();
  };

  createProject = function() {
    return createFolders();
  };

  createFolders = function() {
    var folders, projectDir, templateDir;
    folders = ['src', 'src/jade', 'src/styl', 'src/jade/posts', 'src/jade/templates', 'www', 'www/css'];
    folders.forEach(function(folder) {
      return fs.mkdirSync(folder, function(err, stdout, stderr) {
        err && (function() {
          throw err;
        })();
        return util.puts('Folders created');
      });
    });
    projectDir = path.resolve(process.cwd(), './');
    templateDir = path.resolve(__dirname, '../blank/');
    util.puts(projectDir);
    util.puts(templateDir);
    return fs.copy(templateDir, projectDir, function(err) {
      return console.log(err);
    });
  };

  createBlog = function() {
    return console.log("Create Blog");
  };

  exports.run = function(args, options) {
    if (options.version) {
      quitWithMsg("Jott v" + VERSION);
    }
    if (options.init) {
      return createProject();
    } else if (options["new"]) {
      return createBlog();
    }
  };

}).call(this);
