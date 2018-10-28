/**
 * find all shortest paths between two vertices based on depth-first appraoch
 * @returns {array} - all existing shortest paths
 */
module.exports = graph => (key1, key2) => {
  let shortestPaths = [];
  const visited = {};

  const getPathWeight = (path) => {
    let weight = 0;
    for (let i = 0; i < path.length - 1; i += 1) {
      weight += graph.getWeight(path[i], path[i + 1]);
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
    if (graph.hasVertex(k1) && !visited[k1]) {
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
