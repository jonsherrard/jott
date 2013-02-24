(function() {
  var entities, exec, fs, jottOptions, log, moment, path, projectDir, prompt;

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
