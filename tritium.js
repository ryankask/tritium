var ternarySearchTree = function() {
  var root,
      numWords = 0,
      numNodes = 0;

  function insert(node, chars) {
    var firstChar = chars.charAt(0),
        node;

    if (!firstChar) return null;

    if (!node) {
      node = {
        character: firstChar,
        left: null,
        middle: null,
        right: null,
        word: false
      };
      numNodes += 1;
    }

    if (!root) root = node;

    if (firstChar < node.character) {
      node.left = insert(node.left, chars);
    } else if (firstChar === node.character) {
      if (chars.length > 1) {
        node.middle = insert(node.middle, chars.slice(1));
      } else {
        node.word = true;
        numWords += 1;
      }
    } else {
      node.right = insert(node.right, chars);
    }

    return node;
  }

  function search(node, chars) {
    var firstChar = chars.charAt(0),
        rest;

    if (!node || !firstChar) return null;

    if (firstChar < node.character) {
      return search(node.left, chars);
    } else if (firstChar > node.character) {
      return search(node.right, chars);
    } else {
      rest = chars.slice(1);
      if (!rest) {
        return node;
      } else {
        return search(node.middle, rest);
      }
    }

    return null;
  }

  function childWords(node, prefix, limit) {
    var foundWords = [],
        parentNode,
        traversalData = {
          foundWords: foundWords,
          prefix: prefix
        };

    if (!node || !prefix) return foundWords;

    parentNode = search(node, prefix);

    if (!parentNode) return foundWords;

    depthFirstTraversal(parentNode.middle, function(node, data) {
      if (data.foundWords.length >= limit) return null;

      data = {
        foundWords: data.foundWords,
        prefix: data.prefix + node.character
      };

      if (node.word) data.foundWords.push(data.prefix);

      return data;
    }, traversalData);

    return foundWords;
  }

  function depthFirstTraversal(node, visit, data) {
    var modifiedData;

    if (!node || data === null) return;

    if (node.left) depthFirstTraversal(node.left, visit, data);
    modifiedData = visit(node, data);
    if (node.middle) depthFirstTraversal(node.middle, visit, modifiedData);
    if (node.right) depthFirstTraversal(node.right, visit, data);
  }

  return {
    getRoot: function() {
      return root;
    },
    wordCount: function() {
      return numWords;
    },
    nodeCount: function() {
      return numNodes;
    },
    add: function(word) {
      insert(root, word);
    },
    has: function(word) {
      return search(root, word) ? true : false;
    },
    prefixSearch: function(word, limit) {
      return childWords(root, word, limit);
    },
    traverse: function(visit, data) {
      depthFirstTraversal(root, visit, data);
    }
  }
};

exports.ternarySearchTree = ternarySearchTree;
