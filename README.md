# tree

Object traversal with filters

# Usage

```js
var root = function (stats) {
  return stats.node === stats.root;
};

var own = function (stats) {
  return stats.parent.hasOwnProperty(stats.index);
};

var tree = require('tree');

var obj = {
  foo: 1,
  bar: {
    a: [1,2,3],
    b: [{
      x: 'hi!',
      y: 'bye!'
    },
    {
      x: null,
      z: console.log
    }]
  }
};

tree(obj)
  .skip(root)
  .follow(own)
  .each(function (stats) {
    console.log(stats.index, stats.node);
  });
```
