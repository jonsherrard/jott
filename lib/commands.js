(function() {

  module.exports = {
    init: function() {
      return require('./createProject')();
    },
    build: function() {
      return require('./compileSource')();
    },
    post: function() {
      return require('./createBlogPost')();
    },
    ga: function() {
      return require('./addGoogleAnalytics')();
    }
  };

}).call(this);
