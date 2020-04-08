/**
 * @datastructures-js/graph
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const DirectedGraph = require('./directedGraph');

/**
 * @class Graph
 * @extends DirectedGraph
 * A graph with a connecting edge between vertices
 */
class Graph extends DirectedGraph {
  /**
   * @public
   * @override
   * removes all edges of a vertex
   * @param {number|string} key
   * @return {number} number of removed edges
   */
  removeEdges(key) {
    if (!this.hasVertex(key)) return 0;

    let removed = 0;
    this._edges.get(key).forEach((weight, destKey) => {
      this.removeEdge(destKey, key);
      removed += 1;
    });

    this._edgesCount -= this._edges.get(key).size;
    this._edges.set(key, new Map());
    return removed;
  }

  /**
   * @public
   * @override
   * add a connecting edge between two vertices
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @param {number} weight
   * @throws {Error} if a vertex key does not exist
   */
  addEdge(sourceKey, destKey, weight) {
    super.addEdge(sourceKey, destKey, weight);
    super.addEdge(destKey, sourceKey, weight);
  }

  /**
   * @public
   * @override
   * removes the connecting edge between two vertices
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @returns {boolean}
   */
  removeEdge(sourceKey, destKey) {
    super.removeEdge(sourceKey, destKey);
    return super.removeEdge(destKey, sourceKey);
  }

  /**
   * @public
   * @override
   * the number of connecting edges in the graph
   * @returns {number}
   */
  edgesCount() {
    return super.edgesCount() / 2;
  }
}

module.exports = Graph;
