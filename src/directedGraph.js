/**
 * datastructures-js/graph
 * @copyright 2019 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const Queue = require('@datastructures-js/queue');
const Vertex = require('./vertex');

/**
 * @class DirectedGraph
 * A graph with unidirectional path between vertices
 */
class DirectedGraph {
  constructor() {
    this.vertices = new Map();
    this.edges = new Map();
    this.edgeCount = 0;
  }

  /**
   * @public
   * adds a vertex to the graph
   * @param {number|string} key
   * @param {object} value
   */
  addVertex(key, value) {
    this.vertices.set(key, new Vertex(key, value));
    if (this.edges.has(key)) return;

    this.edges.set(key, new Map());
  }

  /**
   * @public
   * checks if the graph has a vertex by its key
   * @param {number|string} key
   * @return {boolean}
   */
  hasVertex(key) {
    return this.vertices.has(key);
  }

  /**
   * @public
   * remove a vertex and all its in and out edges
   * @param {number|string} key
   */
  removeVertex(key) {
    if (!this.hasVertex(key)) return;

    this.removeEdges(key);
    this.edges.delete(key);
    this.vertices.delete(key);
  }

  /**
   * @public
   * the number of vertices in the graph
   * @returns {number}
   */
  verticesCount() {
    return this.vertices.size;
  }

  /**
   * @public
   * add a unidirectional edge from source to destination
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @param {number} weight
   */
  addEdge(srcKey, destKey, weight) {
    if (!this.vertices.has(srcKey)) {
      throw new Error(`addEdge: vertex "${srcKey}" not found`);
    }

    if (!this.vertices.has(destKey)) {
      throw new Error(`addEdge: vertex "${destKey}" not found`);
    }

    this.edges.get(srcKey).set(destKey, +weight || 1);
    this.edgeCount += 1;
  }

  /**
   * @public
   * checks if there is a direction from a source to destination
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @returns {boolean}
   */
  hasEdge(srcKey, destKey) {
    return this.hasVertex(srcKey)
      && this.hasVertex(destKey)
      && this.edges.get(srcKey).has(destKey);
  }

  /**
   * get the weight of an edge if exists
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @returns {number}
   * @public
   */
  getWeight(srcKey, destKey) {
    if (this.hasVertex(srcKey) && srcKey === destKey) return 0;
    if (!this.hasEdge(srcKey, destKey)) return null;
    return this.edges.get(srcKey).get(destKey);
  }

  /**
   * @public
   * removes the unidirectional edge from source to destination
   * @param {number|string} srcKey
   * @param {number|string} destKey
   */
  removeEdge(srcKey, destKey) {
    if (!this.hasEdge(srcKey, destKey)) return;

    this.edges.get(srcKey).delete(destKey);
    this.edgeCount -= 1;
  }

  /**
   * @protected
   * removes all outgoing edges of a vertex
   * @param {number|string} key
   */
  removeEdges(key) {
    if (!this.hasVertex(key)) return;

    this.edges.forEach((destEdges, srcKey) => {
      if (!destEdges.has(key)) return;
      this.removeEdge(srcKey, key);
    });

    this.edgeCount -= this.edges.get(key).size;
    this.edges.set(key, new Map());
  }

  /**
   * @public
   * the number of edges in the graph
   * @returns {number}
   */
  edgesCount() {
    return this.edgeCount;
  }

  /**
   * @public
   * traverse all vertices in the graph using depth-first search
   * @param {number|string} srcKey
   * @param {function} cb
   */
  traverseDfs(srcKey, cb, visited = new Set()) {
    if (!this.hasVertex(srcKey) || visited.has(srcKey)) return;

    cb(this.vertices.get(srcKey));
    visited.add(srcKey);

    this.edges.get(srcKey).forEach((weight, destKey) => {
      this.traverseDfs(destKey, cb, visited);
    });
  }

  /**
   * @public
   * traverse all vertices in the graph using breadth-first search
   * @param {number|string} srcKey
   * @param {function} cb
   */
  traverseBfs(srcKey, cb) {
    if (!this.hasVertex(srcKey)) return;

    const queue = new Queue([srcKey]);
    const visited = new Set([srcKey]);

    while (!queue.isEmpty()) {
      const vertex = this.vertices.get(queue.dequeue());
      cb(vertex);
      this.edges.get(vertex.getKey()).forEach((weight, destKey) => {
        if (visited.has(destKey)) return;
        queue.enqueue(destKey);
        visited.add(destKey);
      });
    }
  }

  /**
   * @public
   * clears the graph
   */
  clear() {
    this.vertices = new Map();
    this.edges = new Map();
    this.edgeCount = 0;
  }
}

module.exports = DirectedGraph;
