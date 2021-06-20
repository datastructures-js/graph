/**
 * datastructures-js/graph
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const { DirectedGraph } = require('./directedGraph');

/**
 * @class Graph
 * @extends DirectedGraph
 */
class Graph extends DirectedGraph {
  /**
   * Removes all edges connected to a vertex
   * @public
   * @override
   * @param {number|string} key
   * @return {number} number of removedEdgesCount edges
   */
  removeEdges(key) {
    if (!this.hasVertex(key)) {
      return 0;
    }

    let removedEdgesCount = 0;
    this._edges.get(key).forEach((weight, destKey) => {
      this.removeEdge(destKey, key);
      removedEdgesCount += 1;
    });

    this._edgesCount -= this._edges.get(key).size;
    this._edges.set(key, new Map());
    return removedEdgesCount;
  }

  /**
   * Adds an edge between two existing vertices
   * @public
   * @override
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @param {number} [weight] - default 1
   */
  addEdge(sourceKey, destKey, weight) {
    super.addEdge(sourceKey, destKey, weight);
    return super.addEdge(destKey, sourceKey, weight);
  }

  /**
   * Removes the connecting edge between two vertices
   * @public
   * @override
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @returns {boolean}
   */
  removeEdge(sourceKey, destKey) {
    super.removeEdge(sourceKey, destKey);
    return super.removeEdge(destKey, sourceKey);
  }

  /**
   * Gets the number of edges in the graph
   * @public
   * @override
   * @returns {number}
   */
  getEdgesCount() {
    return super.getEdgesCount() / 2;
  }
}

exports.Graph = Graph;
