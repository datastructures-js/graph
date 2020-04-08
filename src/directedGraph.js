/**
 * @datastructures-js/graph
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const Queue = require('@datastructures-js/queue');
const Vertex = require('./vertex');

/**
 * @class DirectedGraph
 * A graph with a directed path between vertices
 */
class DirectedGraph {
  constructor() {
    this._vertices = new Map();
    this._edges = new Map();
    this._edgesCount = 0;
  }

  /**
   * @public
   * adds a vertex to the graph
   * @param {number|string} key
   * @param {object} value
   * @returns {Vertex}
   */
  addVertex(key, value) {
    this._vertices.set(key, new Vertex(key, value));
    if (!this._edges.has(key)) {
      this._edges.set(key, new Map());
    }
    return this._vertices.get(key);
  }

  /**
   * @public
   * checks if the graph has a vertex by its key
   * @param {number|string} key
   * @return {boolean}
   */
  hasVertex(key) {
    return this._vertices.has(key);
  }

  /**
   * @public
   * remove a vertex and all its in and out edges
   * @param {number|string} key
   */
  removeVertex(key) {
    if (!this.hasVertex(key)) return false;

    this.removeEdges(key);
    this._edges.delete(key);
    this._vertices.delete(key);
    return true;
  }

  /**
   * @public
   * the number of vertices in the graph
   * @returns {number}
   */
  verticesCount() {
    return this._vertices.size;
  }

  /**
   * @public
   * add a direction from source to destination
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @param {number} weight
   * @throws {Error} if a vertex key does not exist
   */
  addEdge(srcKey, destKey, weight) {
    if (!this._vertices.has(srcKey)) {
      throw new Error(`addEdge: vertex "${srcKey}" not found`);
    }

    if (!this._vertices.has(destKey)) {
      throw new Error(`addEdge: vertex "${destKey}" not found`);
    }

    this._edges.get(srcKey).set(destKey, +weight || 1);
    this._edgesCount += 1;
  }

  /**
   * @public
   * checks if there is a direction from source to destination
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @returns {boolean}
   */
  hasEdge(srcKey, destKey) {
    return this.hasVertex(srcKey)
      && this.hasVertex(destKey)
      && this._edges.get(srcKey).has(destKey);
  }

  /**
   * @public
   * get the weight of an edge if exists
   * @param {number|string} srcKey
   * @param {number|string} destKey
   * @returns {number}
   */
  getWeight(srcKey, destKey) {
    if (this.hasVertex(srcKey) && srcKey === destKey) return 0;
    if (!this.hasEdge(srcKey, destKey)) return null;
    return this._edges.get(srcKey).get(destKey);
  }

  /**
   * @public
   * removes the direction from source to destination
   * @param {number|string} srcKey
   * @param {number|string} destKey
   */
  removeEdge(srcKey, destKey) {
    if (!this.hasEdge(srcKey, destKey)) return false;

    this._edges.get(srcKey).delete(destKey);
    this._edgesCount -= 1;
    return true;
  }

  /**
   * @public
   * removes all directions from and to a vertex
   * @param {number|string} key
   * @return {number} number of removed edges
   */
  removeEdges(key) {
    if (!this.hasVertex(key)) return 0;

    let removed = 0;
    this._edges.forEach((destEdges, srcKey) => {
      if (destEdges.has(key)) {
        this.removeEdge(srcKey, key);
        removed += 1;
      }
    });

    removed += this._edges.get(key).size;
    this._edgesCount -= this._edges.get(key).size;
    this._edges.set(key, new Map());
    return removed;
  }

  /**
   * @public
   * the number of directions in the graph
   * @returns {number}
   */
  edgesCount() {
    return this._edgesCount;
  }

  /**
   * @public
   * traverse all vertices in the graph using depth-first search
   * @param {number|string} srcKey
   * @param {function} cb
   */
  traverseDfs(srcKey, cb, visited = new Set()) {
    if (!this.hasVertex(srcKey) || visited.has(srcKey)) return;

    cb(this._vertices.get(srcKey));
    visited.add(srcKey);

    this._edges.get(srcKey).forEach((weight, destKey) => {
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
      const vertex = this._vertices.get(queue.dequeue());
      cb(vertex);
      this._edges.get(vertex.getKey()).forEach((weight, destKey) => {
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
    this._vertices = new Map();
    this._edges = new Map();
    this._edgesCount = 0;
  }
}

module.exports = DirectedGraph;
