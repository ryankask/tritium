tritium
=======

A Javascript implementation of a ternary search tree.

Usage
-----

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
    > tree.prefixSearch('a');
    [ 'airplane',
      'airport',
      'airside',
      'apple' ]
    > tree.prefixSearch('be')
    []

Plan
----

I'm still working on the API. Stay tuned.
