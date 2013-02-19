(function() {
  var addGoogleAnalytics, compileJade, compileSource, compileStylus, createBlogPost, createFolders, createProject, entities, exec, fs, jottOptions, log, moment, path, projectDir, prompt, readSettings,
    _this = this;

  path = require('path');

  fs = require('fs-extra');

  exec = require('child_process').exec;

  prompt = require('cli-prompt');

  moment = require('moment');

  entities = require('entities');

  process.title = 'jott';

  projectDir = path.resolve(process.cwd(), './');

  jottOptions = {};

  log = console.log;

  createProject = function() {
    var settingsJSON,
      _this = this;
    settingsJSON = {};
    return prompt("Enter your Blog's name\n-> ", function(name, end) {
      settingsJSON.title = entities.encode(name);
      return prompt("Enter your Blog's Base URL,\nEg: \"localhost/blogtest\" or \"www.joeblogs.com\" \n(This can be changed in jott.json at anytime.)\nhttp://", function(url, end) {
        settingsJSON.baseUrl = 'http://' + url;
        end();
        return fs.writeJson(projectDir + '/jott.json', settingsJSON, function(err) {
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
        throw err;
      }
      return exec('cat www/css/reset.css www/css/style.css > www/css/c.min.css', function(err, stdout, stderr) {
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

  readSettings = function() {
    return fs.readJson(projectDir + '/jott.json', function(err, jsonObject) {
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
    return prompt('Enter your new blog/post/page title:\n-> ', function(title, end, err) {
      var dateString, string;
      if (err) {
        log(err);
        throw err;
      }
      postTitle = title;
      end();
      dateString = moment().format('MMMM Do YYYY');
      string = 'include ../templates/head\n\
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

  addGoogleAnalytics = function() {
    var _this = this;
    return fs.readJson(projectDir + '/jott.json', function(err, jsonObject) {
      if (err) {
        log(err);
        throw err;
      }
      jottOptions = jsonObject;
      return prompt('Enter your Google Analytics tracking code.\nFormat: UA-12345678-0\n-> ', function(code, end, err) {
        if (err) {
          log(err);
          throw err;
        }
        jottOptions.googleAnalytics = code;
        end();
        return fs.writeJson(projectDir + '/jott.json', jottOptions, function(err) {
          if (err) {
            log(err);
            throw err;
            return console.log('Google Analytics Added');
          }
        });
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
    },
    ga: function() {
      return addGoogleAnalytics();
    }
  };

}).call(this);
