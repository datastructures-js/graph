/**
 * find all shortest paths between two vertices based on depth-first search
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
      const minWeight = getPathWeight(shortestPaths[0]);
      if (weight < minWeight) {
        shortestPaths = [path];
      } else if (weight === minWeight) {
        shortestPaths.push(path);
      }
    } else {
      shortestPaths.push(path);
    }
  };

  const dfs = (k1, k2, depth, path) => {
    if (graph.hasVertex(k1) && !visited[k1]) {
      visited[k1] = true;
      const currentDepth = depth + 1;
      let currentPath = path;
      currentPath.push(k1);
      if (k1 === k2) {
        addShortestPath(currentPath);
      } else {
        const connectedKeys = Object.keys(graph.getEdges(k1));
        connectedKeys.forEach((connected) => {
          if (graph.hasEdge(k1, connected)) {
            dfs(connected, k2, currentDepth, currentPath);
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

  dfs(key1, key2, 0, []);
  return shortestPaths;
};
