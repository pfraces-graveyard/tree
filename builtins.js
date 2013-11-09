var negate = function (test) {
  var negator = function () {
    return !(test.apply(null, arguments));
  };

  return negator;
};

var root = function (stats) {
  return stats.node === stats.root;
};

var own = function (stats) {
  return root(stats) || stats.parent.hasOwnProperty(stats.index);
};

var leaf  = function (stats) {
  return stats.is.leaf;
};

var primitive = function (stats) {
  return stats.is.primitive;
};

module.exports = {
  skip: function (test) {
    this.pick(negate(test));
    return this;
  },
  ignore: function (test) {
    this.follow(negate(test));
    return this;
  },
  own: function () {
    this.follow(own);
    return this;
  },
  branch: function () {
    this.skip(root);
    return this;
  },
  leaf: function () {
    this.pick(leaf);
    return this;
  },
  primitive: function () {
    this.pick(primitive);
    return this;
  }
};
