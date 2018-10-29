/**
 * datastructures-js/graph
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */
const shortestPath = require('./shortest-path');
const queueFn = require('@datastructures-js/queue');

/**
 * graph vertex
 * @function
 */
const vertex = (k, v) => {
  const key = k;
  let value = v;

  /**
   * @returns {(string|number)}
   */
  const getKey = () => key;

  /**
   * @param {object} val
   */
  const setValue = (val) => {
    value = val;
  };

  /**
   * @returns {object}
   */
  const getValue = () => value;

  // vertex api
  return {
    getKey,
    setValue,
    getValue
  };
};

/**
 * graph & directed graph
 * @function
 */
const graph = (options) => {
  let vertices = {};
  let edges = {};
  let verticesCount = 0;
  const { directed } = (options && options) || false;
  const self = {};

  /**
   * add a vertex to the graph
   * @param {(string|number)} key
   * @param {object} value
   */
  self.addVertex = (key, value) => {
    if (!vertices[key]) {
      vertices[key] = vertex(key, value);
      edges[key] = {};
      verticesCount += 1;
    }
  };

  /**
   * removes a vertex from the graph
   * @param {(string|number} key
   */
  self.removeVertex = (key) => {
    if (vertices[key]) {
      vertices[key] = undefined;
      verticesCount -= 1;
    }
  };

  /**
   * checks if the graph has a vertex
   * @param {(string|number)} key
   * @returns {boolean}
   */
  self.hasVertex = key => !!vertices[key];

  /**
   * gets the count of the vertices in the graph
   * @returns {number}
   */
  self.countVertices = () => verticesCount;

  /**
   * adds an edge between two existing vertices
   * @param {(string|number)} key1 - first vertext key
   * @param {(string|number)} key2 - second vertex key
   * @param {number} the numeric weight of the edge
   */
  self.addEdge = (key1, key2, weight) => {
    if (self.hasVertex(key1) && self.hasVertex(key2)) {
      const w = +weight || 0;
      edges[key1][key2] = w;
      if (!directed) {
        edges[key2][key1] = w;
      }
    }
  };

  /**
   * checks if the graph has an edge between two existing vertices
   * @param {(string|number)} key1
   * @param {(string|number)} key2
   * @returns {boolean}
   */
  self.hasEdge = (key1, key2) => {
    if (self.hasVertex(key1) && self.hasVertex(key2)) {
      if (directed && edges[key1][key2] >= 0) {
        return true;
      } else if (edges[key1][key2] >= 0 && edges[key2][key1] >= 0) {
        return true;
      }
    }
    return false;
  };

  /**
   * gets the weight of the edge between two vertices
   * @returns {number|null}
   */
  self.getWeight = (key1, key2) => {
    if (self.hasVertex(key1) && key1 === key2) {
      return 0;
    } else if (self.hasEdge(key1, key2)) {
      return edges[key1][key2];
    }
    return null;
  };

  /**
   * gets the connected vertices to a vertex
   * @returns {number|null}
   */
  self.getEdges = key => edges[key] || {};

  /**
   * removes an existing edge between two vertices
   * @param {(string|number)} key1
   * @param {(string|number)} key2
   */
  self.removeEdge = (key1, key2) => {
    if (self.hasEdge(key1, key2)) {
      edges[key1][key2] = -1;
      edges[key2][key1] = -1;
    }
  };

  /**
   * traverse the graph using depth-first approach from a starting vertex
   * @param {(string|number)} key - starting vertex key
   * @param {function} cb - called with each vertext object
   */
  const dfsTraverse = (key, cb) => {
    const visited = {};
    const traverse = (currentKey) => {
      if (self.hasVertex(currentKey) && !visited[currentKey]) {
        cb(vertices[currentKey]);
        visited[currentKey] = true;
        Object.keys(edges[currentKey]).forEach((k) => {
          if (self.hasEdge(currentKey, k) && !visited[k]) {
            traverse(k);
          }
        });
      }
    };
    traverse(key);
  };

  /**
   * traverse the graph using breadth-first approach from a starting vertex
   * @param {(string|number)} key - starting vertex key
   * @param {function} cb - called with each vertext object
   */
  const bfsTraverse = (key, cb) => {
    if (self.hasVertex(key)) {
      const queue = queueFn();
      const visited = {};
      queue.enqueue(key);
      visited[key] = true;
      while (!queue.isEmpty()) {
        const k1 = queue.dequeue();
        cb(vertices[k1]);
        Object.keys(edges[k1]).forEach((k2) => {
          if (self.hasEdge(k1, k2) && !visited[k2]) {
            queue.enqueue(k2);
            visited[k2] = true;
          }
        });
      }
    }
  };

  /**
   * traverse the graph using using a traversal algorithm
   * @param {(string|number)} key - starting vertex key
   * @param {function} cb - called with each vertex value
   * @param {string} - traversal type, default is bfs
   */
  self.traverse = (key, cb, type) => {
    switch (type) {
      case 'dfs':
        dfsTraverse(key, cb);
        break;
      case 'bfs':
        bfsTraverse(key, cb);
        break;
      default:
        bfsTraverse(key, cb);
        break;
    }
  };

  /**
   * finds all the shortest paths between two vertices in the graph
   * @param {(string|number)} key1 - source vertex key
   * @param {(string|number)} key2 - destination vertex key
   * @param {string} type - algorithm name - default is dfs
   * @returns {array}
   */
  self.findShortestPath = (key1, key2, type) => {
    const algFn = shortestPath[type] || shortestPath.dfs;
    return algFn(self)(key1, key2);
  };

  /**
   * clears the graph
   */
  self.clear = () => {
    vertices = {};
    edges = {};
    verticesCount = 0;
  };

  return self;
};

module.exports = graph;
