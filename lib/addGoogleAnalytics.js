(function() {
  var addGoogleAnalytics;

  addGoogleAnalytics = function() {
    var _this = this;
    return fs.readJson(projectDir + '/jott.json', function(err, jsonObject) {
      var jottOptions;
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
          }
          return log('Google Analytics Added');
        });
      });
    });
  };

}).call(this);
