## Graph & Directed Graph
<img width="413" alt="graph" src="https://user-images.githubusercontent.com/6517308/35762771-d25ff10a-0862-11e8-9302-812a36eddb9e.png">

<img width="424" alt="dgraph" src="https://user-images.githubusercontent.com/6517308/35762789-3f49bc06-0863-11e8-85ee-105b352b1aad.png">

Graph's vertex is represented as a key-value object where key data type is: **number** or **string**

## Usage
```js
const graphFn = require('@datastructures-js/graph');

// graph
const graph = graphFn();

// directed graph
const directedGraph = graphFn({ directed: true });
```

## API

**.addVertex(key, value)** 

adds a vertex object to the graph. Vertex object has the following api:

**getKey()** get the vertex key.
**getValue()** get the vertex value.
**setValue(value)** sets (updates) the vertex value.

```javascript
// adding vertices of the graph in the diagram
graph.addVertex('v1', true);
graph.addVertex('v2', true);
graph.addVertex('v3', true);
graph.addVertex('v4', true);
graph.addVertex('v5', true);

// adding vertices of the directed graph in the diagram
directedGraph.addVertex('v1', true);
directedGraph.addVertex('v2', true);
directedGraph.addVertex('v3', true);
directedGraph.addVertex('v4', true);
directedGraph.addVertex('v5', true);
```

**.hasVertex(key)**

checks if the graph has a vertex
```javascript
console.log(graph.hasVertex('v1')); // true
```

**.removeVertex(key)**

removes a vertex from the graph
```javascript
graph.removeVertex('test');
graph.hasVertex('test'); // false
```

**.addEdge(key1, key2, weight)**

adds a weighted edge between two existing vertices.
```javascript
// adding edges of the graph in diagram
graph.addEdge('v1', 'v2', 2);
graph.addEdge('v2', 'v3', 3);
graph.addEdge('v1', 'v3', 6);
graph.addEdge('v2', 'v4', 1);
graph.addEdge('v4', 'v3', 1);
graph.addEdge('v4', 'v5', 4);
graph.addEdge('v3', 'v5', 2);

// adding edges of the directed graph in diagram
directedGraph.addEdge('v1', 'v2', 2);
directedGraph.addEdge('v1', 'v3', 3);
directedGraph.addEdge('v1', 'v4', 1);
directedGraph.addEdge('v2', 'v4', 1);
directedGraph.addEdge('v3', 'v5', 2);
directedGraph.addEdge('v4', 'v3', 1);
directedGraph.addEdge('v4', 'v5', 4);
```

**.hasEdge(key1, key2)**

checks if the graph has an edge between two exsiting vertices
```javascript
console.log(graph.hasEdge('v1', 'v2')); // true
```

**.getWeight(key1, key2)** 

returns the edge's weight between two vertices
```javascript
console.log(graph.getWeight('v1', 'v2')); // 2
```

**.removeEdge(key1, key2)**

removes an existing edge in the graph
```javascript
graph.removeEdge('v1', 'v2');
graph.hasEdge('v1', 'v2'); // false
graph.hasEdge('v2', 'v1'); // false
```

**.countVertices()** 

gets the number of vertices in the graph.
```javascript
console.log(graph.countVertices()); // 5
console.log(directedGraph.countVertices()); // 5
```

**.dfsTraverse(key, cb)** 

traverse the graph from a strating vertex using depth-first search and call cb for each vertex object.
```js
graph.traverseDfs('v1', v => console.log(v.getKey(), v.getValue()));
// v1 true
// v2 true
// v3 true
// v4 true
// v5 true
```

**.bfsTraverse(key, cb)** 

traverse the graph from a strating vertex using breadth-first search and call cb for each vertex object.
```js
graph.traverseDfs('v5', v => console.log(v.getKey(), v.getValue()));
// v5 true
// v4 true
// v3 true
// v2 true
// v1 true
```

**.traverse(key, cb, type)**

traversing the graph using `dfs` or `bfs` approach. Default is `bfs`.
```js
graph.traverse('v5', v => console.log(v.getKey(), v.getValue())); // bfs default
// v5 true
// v4 true
// v3 true
// v2 true
// v1 true

graph.traverse('v1', v => console.log(v.getKey(), v.getValue()), 'dfs');
// v1 true
// v2 true
// v3 true
// v4 true
// v5 true
```

**.dfsShortestPath(key1, key2)**

finds the shortest path between two vertices based on a depth-first search algorithm.
```js
console.log(graph.findShortestPath('v1', 'v5'));
// [ ['v1', 'v2', 'v4', 'v3', 'v5'] ]

console.log(directedGraph.dfsShortestPath('v1', 'v5'));
// [['v1', 'v4', 'v3', 'v5']]
```

**.findShortestPath(v1, v2, algorithm)**

find all possible shortests paths (same weight sum) between two vertices in the graph using an algorithm.
Right now, only a DFS algorithm is implemented. so it does the same as `.dfsShortestPath`.
```javascript
console.log(graph.findShortestPath('v1', 'v5'));
// [ ['v1', 'v2', 'v4', 'v3', 'v5'] ]
```

**.clear()** 

clears all the vertices and edges in the graph.
```javascript
graph.clear();
directedGraph.clear();
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/doubly-linked-list/blob/master/LICENSE)
