(function() {
  var CWD, VERSION, cli, createBlog, createProject, fs, quitWithMsg, sys;

  fs = require('fs');

  sys = require('sys');

  cli = require('cli');

  VERSION = require('./VERSION');

  CWD = process.cwd();

  quitWithMsg = function(message) {
    console.log(message);
    return process.exit();
  };

  createProject = function() {
    return console.log("Create Project");
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
