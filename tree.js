var is = require('u.is'),
    arr = require('u.arr'),
    walk = require('u.walk'),
    builtins = require('./builtins');

var Tree = function (root) {
  this.root = root;
  this.picks = [];
  this.follows = [];
};

Tree.prototype.pick = function (test) {
  this.picks.push(test);
  return this;
};

Tree.prototype.follow = function (test) {
  this.follows.push(test);
  return this;
};

Tree.prototype.walk = function (callback) {
  var tree = this;

  walk(this.root, function (stats, next) {
    var node = stats.node,
        isBranch = is.array(node) || is.object(node),
        isLeaf = !isBranch;

    stats.parent = arr.last(stats.parents);

    stats.is = {
      leaf: isLeaf,
      primitive: isLeaf && !is.func(node)
    };

    tree.picks.every(function (filter) {
      return filter(stats);
    }) && callback(stats);

    isBranch && tree.follows.every(function (filter) {
      return filter(stats);
    }) && next();
  });
};

var plugin = function (plugins) {
  for (var prop in plugins) {
    Tree.prototype[prop] = plugins[prop];
  }
};

plugin(builtins);

module.exports = function (root) {
  return new Tree(root);
};

module.exports.plugin = plugin;
