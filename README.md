# tree

Object traversal with filters

# Usage

```js
var tree = require('u.tree');

var obj = {
  foo: 0.5,
  bar: {
    a: [1,2,3],
    b: [{
      x: 'hi!',
      y: 'bye!'
    },
    {
      x: null,
      z: function () {
        console.log('I am a function!');
      }
    }]
  }
};

tree(obj)
  .primitive()
  .walk(function (stats) {
    console.log(stats.path.join('.'), stats.node);
  });
```

```
foo 0.5
bar.a.0 1
bar.a.1 2
bar.a.2 3
bar.b.0.x hi!
bar.b.0.y bye!
bar.b.1.x null
```

# Install

    npm install u.tree

# Motivation

Straightforward object traversal

# Alternatives

*   traverse
