module.exports = graph => (key, cb) => {
  const visited = {};
  const dfsRecursive = (currentKey) => {
    if (hasVertex(currentKey) && !visited[currentKey]) {
      cb(vertices[currentKey]);
      visited[currentKey] = true;
      const keys = Object.keys(edges[currentKey]);
      keys.forEach((k) => {
        if (hasEdge(currentKey, k) && !visited[k]) {
          dfsRecursive(k);
        }
      });
    }
  };
  dfsRecursive(key);
};
