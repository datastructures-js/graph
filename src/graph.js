/**
 * @datastructures-js/graph
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const DirectedGraph = require('./directedGraph');

/**
 * @class Graph
 * @extends DirectedGraph
 * A graph with bidirectional path between vertices
 */
class Graph extends DirectedGraph {
  /**
   * @public
   * @override
   * removes all edges of a vertex
   * @param {number|string} key
   */
  removeEdges(key) {
    if (!this.hasVertex(key)) return;

    this._edges.get(key).forEach((weight, destKey) => {
      this.removeEdge(destKey, key);
    });

    this._edgesCount -= this._edges.get(key).size;
    this._edges.set(key, new Map());
  }

  /**
   * @public
   * @override
   * add a bidirectional edge between source to a destination
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @param {number} weight
   */
  addEdge(sourceKey, destKey, weight) {
    super.addEdge(sourceKey, destKey, weight);
    super.addEdge(destKey, sourceKey, weight);
  }

  /**
   * @public
   * @override
   * removes the bidirectional edge between two vertices
   * @param {number|string} srcKey
   * @param {number|string} destKey
   */
  removeEdge(sourceKey, destKey) {
    super.removeEdge(sourceKey, destKey);
    super.removeEdge(destKey, sourceKey);
  }

  /**
   * @public
   * @override
   * the number of edges in the graph
   * @returns {number}
   */
  edgesCount() {
    return super.edgesCount() / 2;
  }
}

module.exports = Graph;
