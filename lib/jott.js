(function() {
  var CWD, VERSION, cli, compileJade, compileSource, compileStylus, createBlogPost, createFolders, createProject, entities, exec, fs, jade, jottOptions, log, moment, path, projectDir, prompt, quitWithMsg, readSettings, stylus, util,
    _this = this;

  path = require('path');

  fs = require('fs-extra');

  util = require('util');

  cli = require('cli');

  stylus = require('stylus');

  jade = require('jade');

  exec = require('child_process').exec;

  prompt = require('cli-prompt');

  moment = require('moment');

  entities = require('entities');

  process.title = 'jott';

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
      settingsJSON.title = entities.encode(name);
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

  createBlogPost = function() {
    var postTitle,
      _this = this;
    postTitle = "";
    return prompt('Enter your new blog/post/page title: ', function(title, end, err) {
      var dateString, string;
      if (err) {
        log(err);
        throw err;
      }
      postTitle = title;
      end();
      dateString = moment().format('MMMM Do YYYY');
      string = 'include ../templates/postHead\n\
\n\
article\n\
    .container\n\
        h3 ' + postTitle + '\n\
        p\n\
        h5.metadata Posted on ' + dateString + '\n\
        hr\n\
\
include ../templates/footer\n';
      return fs.outputFile(projectDir + '/src/jade/posts/' + postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '') + '.jade', string, function(err) {
        if (err) {
          log(err);
          throw err;
        }
        exec('echo "mixin link(\'' + entities.encode(postTitle) + '\', \'' + postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '') + '\')"|cat - src/jade/items.jade  > /tmp/out && mv /tmp/out src/jade/items.jade', function(err, stdout, stderr) {
          if (err) {
            log(err);
            throw err;
          }
          return log('Blog added to index');
        });
        return log('New Post "' + postTitle + '" Created');
      });
    });
  };

  module.exports = {
    post: function() {
      return createBlogPost();
    },
    init: function() {
      return createProject();
    },
    build: function() {
      return compileSource();
    }
  };

}).call(this);
