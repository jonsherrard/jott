(function() {
  var createFolders, entities, fs, path, projectDir, prompt;

  prompt = require('cli-prompt');

  fs = require('fs-extra');

  createFolders = require('./createFolders');

  entities = require('entities');

  path = require('path');

  projectDir = path.resolve(process.cwd(), './');

  module.exports = function() {
    var settingsJSON,
      _this = this;
    console.log('Create Project');
    settingsJSON = {};
    return prompt("Enter your Blog's name\n-> ", function(name, end) {
      settingsJSON.title = entities.encode(name);
      return prompt("Enter your Blog's Base URL,\nEg: \"localhost/blogtest\" or \"www.joeblogs.com\" \n(This can be changed in jott.json at anytime.)\nhttp://", function(url, end) {
        settingsJSON.baseUrl = 'http://' + url;
        end();
        if (settingsJSON.baseUrl === 'http://') {
          settingsJSON.baseUrl = 'http://localhost/' + path.basename(process.cwd());
        }
        return fs.writeJson(projectDir + '/jott.json', settingsJSON, function(err) {
          if (err) {
            log(err);
          }
          return createFolders(name);
        });
      });
    });
  };

}).call(this);
