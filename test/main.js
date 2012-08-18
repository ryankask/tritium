var assert = require('assert'),
    tritium = require('../tritium');

suite('TernarySearchTree', function() {
  var t;

  setup(function() {
    t = tritium.ternarySearchTree();
  });

  suite('#add()', function() {
    test('should create nodes anchored at the root', function() {
      t.add('mop');
      root = t.getRoot();
      assert.equal(root.character, 'm')
      assert.equal(root.left, null);
      assert.equal(root.right, null)
      assert.equal(root.word, false);

      assert.equal(root.middle.character, 'o')
      assert.equal(root.middle.left, null);
      assert.equal(root.middle.right, null);
      assert.equal(root.middle.word, false);

      assert.equal(root.middle.middle.character, 'p')
      assert.equal(root.middle.middle.left, null);
      assert.equal(root.middle.middle.right, null);
      assert.equal(root.middle.middle.word, true);

      assert.equal(root.middle.middle.middle, undefined);
      assert.equal(root.middle.middle.left, undefined);
      assert.equal(root.middle.middle.right, undefined);
    });

    test('nodes inserted left and right of root', function() {
      t.add('my');
      t.add('as');

      root = t.getRoot();
      assert.equal(root.character, 'm');
      assert.equal(root.middle.character, 'y');
      assert.equal(root.left.character, 'a');
      assert.equal(root.left.word, false);
      assert.equal(root.left.middle.character, 's');
      assert.equal(root.left.middle.word, true);

      t.add('of');

      assert.equal(root.character, 'm');
      assert.equal(root.right.character, 'o');
      assert.equal(root.right.middle.character, 'f');
      assert.equal(root.right.middle.word, true);
      assert.equal(root.right.middle.middle, undefined);

      t.add('off');

      assert.equal(root.right.middle.character, 'f');
      assert.equal(root.right.middle.word, true);
      assert.equal(root.right.middle.middle.character, 'f');
      assert.equal(root.right.middle.middle.word, true);
      assert.equal(root.right.middle.middle.middle, undefined);
    });
  });

  suite('#exists()', function() {
    test('returns false on an empty tree', function() {
      assert.equal(t.exists('my'), false);
    });

    test('returns false on an empty query', function() {
      t.add('foo');
      assert.equal(t.exists(''), false);
    });

    test('returns false when not found', function() {
      t.add('foo');
      assert.equal(t.exists('bar'), false);
    });

    test('returns true when found', function() {
      t.add('foo');
      assert.equal(t.exists('foo'), true);
    });

    test('returns true when prefix found', function() {
      t.add('foo');
      assert.equal(t.exists('fo'), true);
    });
  });

  suite('#prefixSearch()', function() {
    test('finds all prefixes', function() {
      var found, expected, i;

      t.add('battle');
      t.add('but');
      t.add('bot');
      t.add('botnet');
      t.add('bat');
      t.add('butter');
      t.add('get');

      found = t.prefixSearch('b');
      expected = ['bat', 'battle', 'bot', 'botnet', 'but', 'butter'];
      assert.equal(expected.length, found.length);

      for (i = 0; i < expected.length; i++) {
        assert.equal(expected[i], found[i]);
      }
    });

    test('finds n prefixes', function() {
      var found, expected, i;

      t.add('break');
      t.add('bread');
      t.add('breads');
      t.add('brent');

      found = t.prefixSearch('bre', 2);
      expected = ['bread', 'breads'];
      assert.equal(expected.length, found.length);

      for (i = 0; i < expected.length; i++) {
        assert.equal(expected[i], found[i]);
      }
    });
  });

  suite('#traverse()', function() {
    test('visits all nodes', function() {
      var visitedCharacters = [],
          expectedCharacters,
          i;

      t.add('bob');
      t.add('bit');
      t.add('bar');

      expectedCharacters = ['b', 'a', 'r', 'i', 't', 'o', 'b'];

      t.traverse(function(node) {
        visitedCharacters.push(node.character);
      });

      assert.equal(visitedCharacters.length, expectedCharacters.length);

      for (i = 0; i < expectedCharacters.length; i++) {
        assert.equal(visitedCharacters[i], expectedCharacters[i]);
      }
    });
  });

  suite('miscellaneous methods', function() {
    test('correct number of words counted', function() {
      t.add('foo');
      t.add('bar');
      assert.equal(t.wordCount(), 2);
    });

    test('correct number of nodes counted', function() {
      t.add('most');
      t.add('more');
      assert.equal(t.nodeCount(), 6);
    });
  });
});
