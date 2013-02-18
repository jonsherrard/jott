(function() {
  var CWD, VERSION, cli, compileJade, compileSource, compileStylus, createBlog, createFolders, createProject, exec, fs, jade, jottOptions, log, path, projectDir, prompt, quitWithMsg, readSettings, stylus, util,
    _this = this;

  path = require('path');

  fs = require('fs-extra');

  util = require('util');

  cli = require('cli');

  stylus = require('stylus');

  jade = require('jade');

  exec = require('child_process').exec;

  prompt = require('cli-prompt');

  projectDir = path.resolve(process.cwd(), './');

  jottOptions = {};

  log = console.log;

  VERSION = require('./VERSION');

  CWD = process.cwd();

  quitWithMsg = function(message) {
    console.log(message);
    return process.exit();
  };

  createProject = function() {
    var settingsJSON,
      _this = this;
    settingsJSON = {};
    return prompt("Enter your Blog's name: ", function(name, end) {
      settingsJSON.title = name;
      return prompt("Enter your Blog's base URL, eg: \"localhost/blogtest\" or \"www.joeblogs.com\":", function(url, end) {
        settingsJSON.baseUrl = 'http://' + url;
        end();
        return fs.writeJson(projectDir + '/settings.json', settingsJSON, function(err) {
          if (settingsJSON.baseUrl === '') {
            settingsJSON.baseUrl = 'http://localhost/' + path.basename(path.dirname(require.main.filename));
          }
          if (err) {
            log(err);
          }
          return createFolders(name);
        });
      });
    });
  };

  createFolders = function(name) {
    var templateDir;
    projectDir = path.resolve(process.cwd(), './');
    templateDir = path.resolve(__dirname, '../skeleton/');
    return fs.copy(templateDir, projectDir, function(err) {
      if (err) {
        return console.log(err);
      } else {
        console.log('Your blog ' + name + ' has been created.');
        return compileSource();
      }
    });
  };

  compileSource = function() {
    compileStylus();
    return readSettings();
  };

  compileStylus = function() {
    projectDir = path.resolve(process.cwd(), './');
    return exec('stylus -c -o ' + projectDir + '/www/css ' + projectDir + '/src/styl/style.styl', function(err, stdout, stderr) {
      if (err) {
        log(err);
      }
      return console.log('Stylus Compiled');
    });
  };

  readSettings = function() {
    return fs.readJson(projectDir + '/settings.json', function(err, jsonObject) {
      if (err) {
        log(err);
        throw err;
      }
      jottOptions = jsonObject;
      return compileJade();
    });
  };

  compileJade = function() {
    var indexExecString, options, optionsString, postExecString;
    options = jottOptions;
    optionsString = JSON.stringify(options);
    projectDir = path.resolve(process.cwd(), './');
    postExecString = 'jade -o \'' + optionsString + '\' -O ' + projectDir + '/posts/ ' + projectDir + '/src/jade/posts/*';
    exec(postExecString, function(err, stdout, stderr) {
      if (err) {
        log(err);
      }
      return console.log('Posts Compiled');
    });
    indexExecString = 'jade -o \'' + optionsString + '\' -O ' + projectDir + ' ' + projectDir + '/src/jade/index.jade';
    return exec(indexExecString, function(err, stdout, stderr) {
      if (err) {
        log(err);
      }
      return log('Index Compiled');
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
    } else if (options.compile) {
      return compileSource();
    }
  };

}).call(this);
