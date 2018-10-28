const queueFn = require('@datastructures-js/queue');

module.exports = graph => (key, cb) => {
  if (graph.hasVertex(key)) {
    const queue = queueFn();
    const visited = {};
    queue.enqueue(key);
    visited[key] = true;
    while (!queue.isEmpty()) {
      const k1 = queue.dequeue();
      cb(vertices[k1]);
      const keys = Object.keys(graph.edges(k1));
      keys.forEach((k2) => {
        if (graph.hasEdge(k1, k2) && !visited[k2]) {
          queue.enqueue(k2);
          visited[k2] = true;
        }
      });
    }
  }
};
