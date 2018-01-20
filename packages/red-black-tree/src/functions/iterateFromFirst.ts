import { BRANCH, PathNode, RedBlackTreeIterator, RedBlackTreeStructure, isNone } from '../internals';

/**
 * Returns an iterator that starts from the first entry in the tree and iterates toward the end of the tree. Emissions
 * are references to nodes in the tree, exposed directly to allow Collectable.RedBlackTree to be efficiently consumed as
 * a backing structure for other data structures. Do not modify the returned node.
 *
 * @export
 * @template K The type of keys in the tree
 * @template V The type of values in the tree
 * @param {RedBlackTreeStructure<K, V>} tree The input tree
 * @returns {RedBlackTreeIterator<K, V>} An iterator for entries in the tree
 */
export function iterateFromFirst<K, V = null> (tree: RedBlackTreeStructure<K, V>): RedBlackTreeIterator<K, V> {
  var path: PathNode<K, V> = PathNode.NONE;
  var node = tree._root;
  while(!isNone(node)) {
    path = PathNode.next(node, path, BRANCH.LEFT);
    node = node._left;
  }
  return RedBlackTreeIterator.create(path, tree._compare, false);
}
