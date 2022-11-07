# @datastructures-js/graph

[![npm](https://img.shields.io/npm/v/@datastructures-js/graph.svg)](https://www.npmjs.com/package/@datastructures-js/graph)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/graph.svg)](https://www.npmjs.com/package/@datastructures-js/graph) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/graph)

Graph & Directed Graph implementation in javascript.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [addVertex](#addvertex)
  * [hasVertex](#hasvertex)
  * [getVertexValue](#getvertexvalue)
  * [getVerticesCount](#getverticescount)
  * [addEdge](#addedge)
  * [hasEdge](#hasedge)
  * [getEdgesCount](#getedgescount)
  * [getWeight](#getweight)
  * [getConnectedVertices](#getconnectedvertices)
  * [getConnectedEdges](#getconnectededges)
  * [removeVertex](#removevertex)
  * [removeEdge](#removeedge)
  * [removeEdges](#removeedges)
  * [traverseDfs](#traversedfs)
  * [traverseBfs](#traversebfs)
  * [clear](#clear)
 * [Build](#build)
 * [License](#license)

## install
```sh
npm install --save @datastructures-js/graph
```

### require

```js
const { Graph, DirectedGraph } = require('@datastructures-js/graph');
```

### import

```js
import { Graph, DirectedGraph } from '@datastructures-js/graph';
```

## API

### constructor
Creates a new graph

##### JS
```js
const directedGraph = new DirectedGraph();

const graph = new Graph();
```

##### TS
```js
// DirectedGraph<T extends number|string, U = undefined>
const directedGraph = new DirectedGraph<number, { id: string, someProp: any }>();

// Graph<T extends number|string, U = undefined>
const graph = new Graph<string, number>();
```

### addVertex
Adds a vertex to the graph.

```js
directedGraph
  .addVertex('v1', 1)
  .addVertex('v2', 2)
  .addVertex('v3', 3)
  .addVertex('v4', 4)
  .addVertex('v5', 5);

graph
  .addVertex('v1', true)
  .addVertex('v2', true)
  .addVertex('v3', true)
  .addVertex('v4', true)
  .addVertex('v5', true);
```

### hasVertex
Checks if the graph has a vertex by its key.

```js
console.log(directedGraph.hasVertex('v7')); // false
console.log(graph.hasVertex('v1')); // true
```

### getVertexValue
Returns the value associated with a vertex key.

```js
console.log(directedGraph.getVertexValue('v5')); // 5
console.log(graph.getVertexValue('v1')); // true
```

### getVerticesCount
Gets the number of vertices in the graph.

```js
console.log(directedGraph.getVerticesCount()); // 5
console.log(graph.getVerticesCount()); // 5
```

### addEdge
Adds a weighted edge between two existings vertices. Default weight is 1 if not defined. The single edge is a direction from source to destination in a directed graph, and a two-way connection in a graph.

```js
directedGraph
  .addEdge('v1', 'v2', 2)
  .addEdge('v1', 'v3', 3)
  .addEdge('v1', 'v4', 1)
  .addEdge('v2', 'v4', 1)
  .addEdge('v3', 'v5', 2)
  .addEdge('v4', 'v3', 1)
  .addEdge('v4', 'v5', 4);

graph
  .addEdge('v1', 'v2', 2)
  .addEdge('v2', 'v3', 3)
  .addEdge('v1', 'v3', 6)
  .addEdge('v2', 'v4', 1)
  .addEdge('v4', 'v3', 1)
  .addEdge('v4', 'v5', 4)
  .addEdge('v3', 'v5', 2);
```

### hasEdge
Checks if the graph has an edge between two existing vertices. In directed graph, it returns true only if there is a direction from source to destination.

```js
console.log(directedGraph.hasEdge('v1', 'v2')); // true
console.log(directedGraph.hasEdge('v2', 'v1')); // false

console.log(graph.hasEdge('v1', 'v2')); // true
console.log(graph.hasEdge('v2', 'v1')); // true
```

### getEdgesCount
Gets the number of edges in the graph.

```js
console.log(directedGraph.getEdgesCount()); // 7
console.log(graph.getEdgesCount()); // 7
```

### getWeight
Gets the edge's weight between two vertices. If there is no direct edge between the two vertices, it returns `Infinity`. It also returns 0 if the source key is equal to destination key.

```js
console.log(directedGraph.getWeight('v1', 'v2')); // 2
console.log(directedGraph.getWeight('v2', 'v1')); // Infinity
console.log(directedGraph.getWeight('v1', 'v1')); // 0

console.log(graph.getWeight('v1', 'v2')); // 2
console.log(graph.getWeight('v2', 'v1')); // 2
console.log(graph.getWeight('v1', 'v1')); // 0
console.log(graph.getWeight('v1', 'v4')); // Infinity
```

### getConnectedVertices
Returns a list of keys of vertices connected to a given vertex.

```js
console.log(directedGraph.getConnectedVertices('v4')); // ['v3', 'v5']
console.log(graph.getConnectedVertices('v1')); // ['v2', 'v3']
```

### getConnectedEdges
Returns an object of keys of vertices connected to a given vertex with the edges weight.

```js
console.log(directedGraph.getConnectedEdges('v4')); // { v3: 1, v5: 4 }
console.log(graph.getConnectedEdges('v1')); // { v2: 2, v3: 6 }
```

### removeVertex
Removes a vertex with all its edges from the graph.

```js
directedGraph.removeVertex('v5');
console.log(directedGraph.getVerticesCount()); // 4
console.log(directedGraph.getEdgesCount()); // 5

graph.removeVertex('v5');
console.log(graph.getVerticesCount()); // 4
console.log(graph.getEdgesCount()); // 5
```

### removeEdge
Removes an edge between two existing vertices

```js
directedGraph.removeEdge('v1', 'v3'); // true
console.log(directedGraph.getEdgesCount()); // 4

graph.removeEdge('v2', 'v3'); // true
console.log(graph.getEdgesCount()); // 4
```

### removeEdges
Removes all connected edges to a vertex and returns the number of removed edges.

```js
const dg = new DirectedGraph()
  .addVertex('v1')
  .addVertex('v2')
  .addVertex('v3')
  .addEdge('v1', 'v2')
  .addEdge('v2', 'v1')
  .addEdge('v1', 'v3')
  .removeEdges('v1'); // 3

const g = new Graph()
  .addVertex('v1')
  .addVertex('v2')
  .addVertex('v3')
  .addEdge('v1', 'v2')
  .addEdge('v1', 'v3')
  .removeEdges('v1'); // 2
```

### traverseDfs
Traverses the graph from a starting vertex using the depth-first recursive search. it also accepts an optional third param as a callback to abort traversal when it returns true.

```js
directedGraph.traverseDfs('v1', (key, value) => console.log(`${key}: ${value}`));
/*
v1: 1
v2: 2
v4: 4
v3: 3
*/

graph.traverseDfs('v1', (key, value) => console.log(`${key}: ${value}`));
/*
v1: true
v2: true
v4: true
v3: true
*/

let counter = 0;
graph.traverseDfs('v1', (key, value) => {
  console.log(`${key}: ${value}`);
  counter += 1;
}, () => counter > 1);
/*
v1: true
v2: true
*/
```

### traverseBfs
Traverses the graph from a starting vertex using the breadth-first search with a queue. it also accepts an optional third param as a callback to abort traversal when it returns true.

```js
directedGraph.traverseBfs('v1', (key, value) => console.log(`${key}: ${value}`));
/*
v1: 1
v2: 2
v4: 4
v3: 3
*/

graph.traverseBfs('v1', (key, value) => console.log(`${key}: ${value}`));
/*
v1: true
v2: true
v3: true
v4: true
*/

let counter = 0;
graph.traverseBfs('v1', (key, value) => {
  console.log(`${key}: ${value}`);
  counter += 1;
}, () => counter > 1);
/*
v1: true
v2: true
*/
```

### clear
Clears all vertices and edges in the graph.

```js
directedGraph.clear();
console.log(directedGraph.getVerticesCount()); // 0
console.log(directedGraph.getEdgesCount()); // 0

graph.clear();
console.log(graph.getVerticesCount()); // 0
console.log(graph.getEdgesCount()); // 0
```

## Build
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/graph/blob/master/LICENSE)
