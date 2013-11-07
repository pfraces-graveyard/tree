var walk = require('u.walk');

var Tree = function (root) {
  this.root = root;
  this.picks = [];
  this.follows = [];
};

var negate = function (test) {
  var negator = function () {
    return !(test.apply(null, arguments));
  };

  return negator;
};

Tree.prototype.pick = function (test) {
  this.picks.push(test);
  return this;
};

Tree.prototype.skip = function (test) {
  this.picks.push(negate(test));
  return this;
};

Tree.prototype.follow = function (test) {
  this.picks.push(test);
  this.follows.push(test);
  return this;
};

Tree.prototype.ignore = function (test) {
  this.picks.push(negate(test));
  this.follows.push(negate(test));
  return this;
};

Tree.prototype.each = function (callback) {
  var tree = this;

  walk(this.root, function (stats, next) {
    tree.picks.every(function (filter) {
      return filter(stats);
    }) && callback(stats);

    tree.follows.every(function (filter) {
      return filter(stats);
    }) && next();
  });
};

module.exports = function (root) {
  return new Tree(root);
};
