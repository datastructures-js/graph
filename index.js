/**
 * datastructures-js/graph
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const queueFn = require('@datastructures-js/queue');

/**
 * graph vertex
 * @function
 */
const vertex = (k, v) => {
  const key = k;
  let value = v;

  const getKey = () => key;

  const setValue = (val) => {
    value = val;
  };

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

  /**
   * add a vertex to the graph
   * @param {(string|number)} key
   * @param {object} value
   */
  const addVertex = (key, value) => {
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
  const removeVertex = (key) => {
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
  const hasVertex = key => !!vertices[key];

  /**
   * gets the count of the vertices in the graph
   * @returns {number}
   */
  const countVertices = () => verticesCount;

  /**
   * adds an edge between two existing vertices
   * @param {(string|number)} key1 - first vertext key
   * @param {(string|number)} key2 - second vertex key
   * @param {number} the numeric weight of the edge
   */
  const addEdge = (key1, key2, weight) => {
    if (hasVertex(key1) && hasVertex(key2)) {
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
  const hasEdge = (key1, key2) => {
    if (hasVertex(key1) && hasVertex(key2)) {
      if (directed && edges[key1][key2] >= 0) {
        return true;
      } else if (edges[key1][key2] >= 0 && edges[key2][key1] >= 0) {
        return true;
      }
    }
    return false;
  };

  /**
   * @public
   * gets the weight of the edge between two vertices
   * @returns {number|null}
   */
  const getWeight = (key1, key2) => {
    if (hasVertex(key1) && key1 === key2) {
      return 0;
    } else if (hasEdge(key1, key2)) {
      return edges[key1][key2];
    }
    return null;
  };

  /**
   * removes an existing edge between two vertices
   * @param {(string|number)} key1
   * @param {(string|number)} key2
   */
  const removeEdge = (key1, key2) => {
    if (hasEdge(key1, key2)) {
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
    const dfsTraverseFn = (currentKey) => {
      if (hasVertex(currentKey) && !visited[currentKey]) {
        cb(vertices[currentKey]);
        visited[currentKey] = true;
        Object.keys(edges[currentKey]).forEach((k) => {
          if (hasEdge(currentKey, k) && !visited[k]) {
            dfsTraverseFn(k);
          }
        });
      }
    };
    dfsTraverseFn(key);
  };

  /**
   * traverse the graph using breadth-first approach from a starting vertex
   * @param {(string|number)} key - starting vertex key
   * @param {function} cb - called with each vertext object
   */
  const bfsTraverse = (key, cb) => {
    if (hasVertex(key)) {
      const queue = queueFn();
      const visited = {};
      queue.enqueue(key);
      visited[key] = true;
      while (!queue.isEmpty()) {
        const k1 = queue.dequeue();
        cb(vertices[k1]);
        Object.keys(edges[k1]).forEach((k2) => {
          if (hasEdge(k1, k2) && !visited[k2]) {
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
   * @param {string} - traversal type, default is breadth-first
   */
  const traverse = (key, cb, type) => {
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
   * find all shortest paths between two vertices based on depth-first appraoch
   * @param {(string|number)} key1 - source vertex key
   * @param {(string|number)} key2 - destination vertex key
   * @returns {array} - all existing shortest paths
   */
  const dfsShortestPath = (key1, key2) => {
    let shortestPaths = [];
    const visited = {};

    const getPathWeight = (path) => {
      let weight = 0;
      for (let i = 0; i < path.length - 1; i += 1) {
        weight += getWeight(path[i], path[i + 1]);
      }
      return weight;
    };

    const addShortestPath = (path) => {
      if (shortestPaths.length > 0) {
        const weight = getPathWeight(path);
        const shortestWeight = getPathWeight(shortestPaths[0]);

        if (weight < shortestWeight) {
          shortestPaths = [path];
        } else if (weight === shortestWeight) {
          shortestPaths.push(path);
        }
      } else {
        shortestPaths.push(path);
      }
    };

    const dfsShortestPathFn = (k1, k2, depth, path) => {
      if (hasVertex(k1) && !visited[k1]) {
        visited[k1] = true;
        const currentDepth = depth + 1;
        let currentPath = path;
        currentPath.push(k1);
        if (k1 === k2) {
          addShortestPath(currentPath);
        } else if (edges[k1]) {
          Object.keys(edges[k1]).forEach((k) => {
            if (hasEdge(k1, k)) {
              dfsShortestPathFn(k, k2, currentDepth, currentPath);
              // backward tracking - reset already visited vertices
              for (let i = currentDepth; i < currentPath.length; i += 1) {
                visited[currentPath[i]] = false;
              }
              currentPath = currentPath.slice(0, currentDepth);
            }
          });
        }
      }
    };

    dfsShortestPathFn(key1, key2, 0, []);
    return shortestPaths;
  };

  /**
   * finds all the shortest paths between two vertices in the graph
   * @param {(string|number)} key1 - source vertex key
   * @param {(string|number)} key2 - destination vertex key
   * @param {string} algorithm
   * @returns {array}
   */
  const findShortestPath = (key1, key2, algorithm) => {
    switch (algorithm) {
      case 'dfs':
        return dfsShortestPath(key1, key2);
      default:
        return dfsShortestPath(key1, key2);
    }
  };

  /**
   * clears the graph
   */
  const clear = () => {
    vertices = {};
    edges = {};
    verticesCount = 0;
  };

  // graph api
  return {
    addVertex,
    removeVertex,
    hasVertex,
    countVertices,
    addEdge,
    hasEdge,
    removeEdge,
    getWeight,
    dfsTraverse,
    bfsTraverse,
    traverse,
    dfsShortestPath,
    findShortestPath,
    clear
  };
};

module.exports = graph;
