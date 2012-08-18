# tritium

A Javascript implementation of a ternary search tree.

# Usage

    > tritium = require('tritium');
    > tree = tritium.ternarySearchTree();
    > tree.add('airplane');
    > tree.add('airport');
    > tree.add('airside');
    > tree.add('apple');
    > tree.has('air');
    true
    > tree.has('apple');
    true
    > tree.has('apples');
    false
    > tree.prefixSearch('airp');
    [ 'airplane', 'airport' ]
    > tree.prefixSearch('air');
    [ 'airplane',
      'airport',
      'airside' ]
    > tree.prefixSearch('be')
    []

# API

## Module

### tritium.ternarySearchTree()

Creates an empty ternary search tree.

## Ternary search tree methods

### .getRoot()

Returns the root node of the tree.

### .wordCount()

Returns the number of words added to the tree. This is the same as the
number of times add() has been called.

### .nodeCount()

Returns the number of nodes in the tree.

### .add(word)

Adds a new word to the tree.

### .has(prefix)

Tests whether a given `prefix` is in the tree.

### .prefixSearch(prefix [, limit])

Returns an array of words that begin with `prefix`. If `limit` is
specified, the first `limit` words found during the traversal will be
returned. For example:

    > tree.add('timber');
    > tree.add('tin');
    > tree.prefixSearch('ti', 1);
    ['timber']

At the moment, "timber" is found because the search is done in a
depth-first manner. I plan to implement a breadth-first search in the
future.

### .traverse(visit [, data])

Performs a depth-first traversal of the tree, calling `visit` on each
node. It optionally accepts an object that can store arbitrary
information.

`visit` is a callback that has the same signature as `traverse`:

    > tree.add('bar')
    > tree.add('baz')
    > d = { seen: [] };
    > tree.traverse(function(node, data) {
    ... data.seen.push(node.character);
    ... return data;
    ... }, d);
    > d
    { seen: [ 'b', 'a', 'r', 'z' ] }

# Plan

I'm still working on the API but here are some tasks that need to be done:

* Implement a breadth-first traversal and search
* Add some benchmarks (how does it compare to other solutions?)
* Implement a trie and compare performance

Stay tuned.
