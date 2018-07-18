
## Graph &  Directed Graph
<img width="413" alt="graph" src="https://user-images.githubusercontent.com/6517308/35762771-d25ff10a-0862-11e8-9302-812a36eddb9e.png">

<img width="424" alt="dgraph" src="https://user-images.githubusercontent.com/6517308/35762789-3f49bc06-0863-11e8-85ee-105b352b1aad.png">

Graph's ertex is represented as a key-value object where key data type is: **number** or **string**

vertex data type: string, number, boolean, null, undefined

**construction**
```javascript
let graph = ds.graph();

// OR

let graph = ds.g();
```

**.addVertex(vertex)** 

adds a vertex to the graph.
```javascript
graph.addVertex('test');
```

**.hasVertex(vertex)**

checks if the graph has a vertex
```javascript
let check = graph.hasVertex('test'); // true
```

**.removeVertex(vertex)**

checks if the graph has a vertex
```javascript
graph.removeVertex('test');
graph.hasVertex('test'); // false
```

**.addEdge(v1, v2, weight)** 

adds a weighted edge between two existing vertices.
```javascript
graph.addVertex('v1');
graph.addVertex('v2');
graph.addEdge('v1', 'v2', 3)
```

**.hasEdge(v1, v2)**

checks if the graph has an edge between two exsiting vertices
```javascript
let check = graph.hasEdge('v1', 'v2'); // true
```

**.getWeight(v1, v2)** 

returns the weight between two vertices
```javascript
let w = graph.getWeight('v1', 'v2'); // 3
```

**.removeEdge(v1, v2)**

removes an existing edge in the graph
```javascript
graph.removeEdge('v1', 'v2');
graph.hasEdge('v1', 'v2'); // false
graph.hasEdge('v2', 'v1'); // false
```

**.addPath(v1, v2, weight)** 

adds an edge between two vertices and creates the vertices if one or both dont exist.
```javascript
// building the diagram graph
graph.addPath('v1', 'v2', 2);
graph.addPath('v2', 'v3', 3);
graph.addPath('v1', 'v3', 6);
graph.addPath('v2', 'v4', 1);
graph.addPath('v4', 'v3', 1);
graph.addPath('v4', 'v5', 4);
graph.addPath('v3', 'v5', 2);
```

**.countVertices()** 

returns the number of vertices in the graph.
```javascript
let count = graph.countVertices(); // 5
```

**.traverse(vertex, cb, type)** 

traverse the graph.
* type: 'bfs' OR 'dfs' (breadth-first search or depth-first search). default is 'bfs'

``` javascript
// bfs traverse
graph.traverse('v5', (v) => console.log(v), 'bfs');
// v5
// v4
// v3
// v2
// v1

// dfs traverse
graph.traverse('v1', (v) => console.log(v), 'dfs');
// v1
// v2
// v3
// v4
// v5
```

**.findShortestPath(v1, v2)**

find all possible shortests paths between two vertices in the graph
``` javascript
let shortestPath = graph.findShortestPath('v1', 'v5'); // [ ['v1', 'v2', 'v4', 'v3', 'v5'] ]
```

**.clear()** 

clears all the nodes from the graph.
```javascript
graph.clear();
```

## DirectedGraph
<img width="424" alt="dgraph" src="https://user-images.githubusercontent.com/6517308/35762789-3f49bc06-0863-11e8-85ee-105b352b1aad.png">

**construction**
``` javascript
let dgraph = ds.directedGraph();

// OR

let dgraph = ds.dg();
```

**.addVertex(vertex)** 

adds a vertex to the graph.
```javascript
dgraph.addVertex('test');
```

**.hasVertex(vertex)**

checks if the graph has a vertex
```javascript
let check = dgraph.hasVertex('test'); // true
```

**.removeVertex(vertex)**

checks if the graph has a vertex
```javascript
dgraph.removeVertex('test');
dgraph.hasVertex('test'); // false
```

**.addEdge(v1, v2, weight)**

adds a weighted direction from v1 to v2
```javascript
dgraph.addVertex('v1');
dgraph.addVertex('v2');
dgraph.addEdge('v1', 'v2', 3);
```

**.hasEdge(v1, v2)**

checks if the graph has a direction from v1 to v2
```javascript
let check1 = dgraph.hasEdge('v1', 'v2'); // true
let check2 = dgraph.hasEdge('v2', 'v1'); // false
```

**.getWeight(v1, v2)** 

returns the weight from v1 to v2
```javascript
let w = dgraph.getWeight('v1', 'v2'); // 3
```

**.removeEdge(v1, v2)**

removes the direction from v1 to v2
```javascript
dgraph.removeEdge('v1', 'v2');
dgraph.hasEdge('v1', 'v2'); // false
```

**.addPath(v1, v2, weight)**

adds a direction from v1 to v2 and creates both vertices if not exist
```javascript
// build the diagram dgraph
dgraph.addPath('v1', 'v2', 2);
dgraph.addPath('v1', 'v3', 3);
dgraph.addPath('v1', 'v4', 1);
dgraph.addPath('v2', 'v4', 1);
dgraph.addPath('v3', 'v5', 2);
dgraph.addPath('v4', 'v3', 1);
dgraph.addPath('v4', 'v5', 4);
```

**.countVertices()** 

returns the number of vertices in the graph.
```javascript
let count = dgraph.countVertices(); // 5
```

**.traverse(vertex, cb, type)** 

traverse the graph.
* type: 'bfs' OR 'dfs' (breadth-first search or depth-first search). default is 'bfs'
``` javascript
// bfs traverse
dgraph.traverse('v1', (v) => console.log(v), 'bfs');
// v1
// v2
// v3
// v4
// v5

// dfs traverse
dgraph.traverse('v5', (v) => console.log(v), 'dfs');
// v1
// v2
// v4
// v3
// v5
```

**.findShortestPath(v1, v2)**

find all possible shortests paths between two vertices in the graph
``` javascript
let shortestPath = dgraph.findShortestPath('v1', 'v5'); // [ ['v1', 'v4', 'v3', 'v5'] ]
```

**.clear()** 

clears all the nodes from the graph.
```javascript
dgraph.clear();
```
