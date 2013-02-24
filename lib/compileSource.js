(function() {

  module.exports = function() {
    require('./compileStylus')();
    return require('./readSettings')();
  };

}).call(this);
