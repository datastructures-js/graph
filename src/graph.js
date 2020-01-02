const DirectedGraph = require('./directedGraph');

/**
 * @class Graph
 * @extends DirectedGraph
 * A graph with bidirectional path between vertices
 */
class Graph extends DirectedGraph {
  /**
   * @public
   * removes all edges of a vertex
   * @param {number|string} key
   */
  removeEdges(key) {
    if (!this.hasVertex(key)) return;

    this.edges.get(key).forEach((weight, destKey) => {
      this.removeEdge(destKey, key);
    });

    this.edgeCount -= this.edges.get(key).size;
    this.edges.set(key, new Map());
  }

  /**
   * @public
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
   * the number of edges in the graph
   * @returns {number}
   */
  edgesCount() {
    return super.edgesCount() / 2;
  }
}

module.exports = Graph;
