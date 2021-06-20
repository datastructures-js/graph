# @datastructures-js/graph

[![build:?](https://travis-ci.org/datastructures-js/graph.svg?branch=master)](https://travis-ci.org/datastructures-js/graph) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/graph.svg)](https://www.npmjs.com/package/@datastructures-js/graph)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/graph.svg)](https://www.npmjs.com/package/@datastructures-js/graph) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/graph)

Graph & Directed Graph implementation in javascript.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

<table><tr><td>
  <img alt="graph" src="https://user-images.githubusercontent.com/6517308/71645678-802cd500-2ca1-11ea-96fb-11a71fd95191.jpg">
</td></tr></table>

# Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [.addVertex(key, value)](#addvertexkey-value)
  * [.hasVertex(key)](#hasvvertex-key)
  * [.getVerticesCount()](#getverticescount)
  * [.addEdge(srcKey, destKey, weight)](#addedgesrckey-destkey-weight)
  * [.hasEdge(srcKey, destKey)](#hasedgesrckey-destkey)
  * [.getEdgesCount()](#getedgescount)
  * [.getWeight(srcKey, destKey)](#getweightsrcKey-destKey)
  * [.removeVertex(key)](#removevertexkey)
  * [.removeEdge(srcKey, destKey)](#removeedgesrckey-destkey)
  * [.removeEdges(key)](#removeedgeskey)
  * [.traverseDfs(srcKey, cb)](#traversedfssrckey-cb)
  * [.traverseBfs(srcKey, cb)](#traversebfssrckey-cb)
  * [.clear()](#clear)
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

### .addVertex(key, value)
Adds a vertex to the graph.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: T (number | string)
      <br />
      value: U
    </td>
    <td align="center">Graph&lt;T, U&gt; | DirectedGraph&lt;T, U&gt;</td>
    <td align="center">O(1)</td>
  </tr>
</table>

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

### .hasVertex(key)
Checks if the graph has a vertex by its key.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: T (number | string)
    </td>
    <td align="center">boolean</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(directedGraph.hasVertex('v7')); // false
console.log(graph.hasVertex('v1')); // true
```

### .getVerticesCount()
Gets the number of vertices in the graph.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(directedGraph.getVerticesCount()); // 5
console.log(graph.getVerticesCount()); // 5
```

### .addEdge(srcKey, destKey, weight)
Adds a weighted edge between two existings vertices. Default weight is 1 if not defined. The single edge is a direction from source to destination in a directed graph, and a two-way connection in a graph.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      srcKey: T (number | string)
      <br />
      destKey: T (number | string)
      <br />
      weight: number
    </td>
    <td align="center">Graph&lt;T, U&gt; | DirectedGraph&lt;T, U&gt;</td>
    <td align="center">O(1)</td>
  </tr>
</table>

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

### .hasEdge(srcKey, destKey)
Checks if the graph has an edge between two existing vertices. In directed graph, it returns true only if there is a direction from source to destination.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      srcKey: T (number | string)
      <br />
      destKey: T (number | string)
    </td>
    <td align="center">boolean</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(directedGraph.hasEdge('v1', 'v2')); // true
console.log(directedGraph.hasEdge('v2', 'v1')); // false

console.log(graph.hasEdge('v1', 'v2')); // true
console.log(graph.hasEdge('v2', 'v1')); // true
```

### .getEdgesCount()
Gets the number of edges in the graph.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(directedGraph.getEdgesCount()); // 7
console.log(graph.getEdgesCount()); // 7
```

### .getWeight(srcKey, destKey)
Gets the edge's weight between two vertices. If there is no direct edge between the two vertices, it returns `Infinity`. It also returns 0 if the source key is equal to destination key.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      srcKey: T (number | string)
      <br />
      destKey: T (number | string)
    </td>
    <td align="center">number</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(directedGraph.getWeight('v1', 'v2')); // 2
console.log(directedGraph.getWeight('v2', 'v1')); // Infinity
console.log(directedGraph.getWeight('v1', 'v1')); // 0

console.log(graph.getWeight('v1', 'v2')); // 2
console.log(graph.getWeight('v2', 'v1')); // 2
console.log(graph.getWeight('v1', 'v1')); // 0
console.log(graph.getWeight('v1', 'v4')); // Infinity
```

### .removeVertex(key)
Removes a vertex with all its edges from the graph.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: T (number | string)
    </td>
    <td align="center">boolean</td>
    <td>
      Graph: O(K) : K = number of connected edges to the vertex
      <br />
      DirectedGraph: O(E) : E = number of edges in the graph
    </td>
  </tr>
</table>

```js
directedGraph.removeVertex('v5');
console.log(directedGraph.getVerticesCount()); // 4
console.log(directedGraph.getEdgesCount()); // 5

graph.removeVertex('v5');
console.log(graph.getVerticesCount()); // 4
console.log(graph.getEdgesCount()); // 5
```

### .removeEdge(srcKey, destKey)
Removes an edge between two existing vertices

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      srcKey: T (number | string)
      <br />
      destKey: T (number | string)
    </td>
    <td align="center">boolean</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
directedGraph.removeEdge('v1', 'v3'); // true
console.log(directedGraph.getEdgesCount()); // 4

graph.removeEdge('v2', 'v3'); // true
console.log(graph.getEdgesCount()); // 4
```

### .removeEdges(key)
Removes all connected edges to a vertex and returns the number of removed edges.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: T (number | string)
    </td>
    <td align="center">number</td>
    <td>
      Graph: O(K) : K = number of connected edges to the vertex
      <br />
      DirectedGraph: O(E) : E = number of edges in the graph
    </td>
  </tr>
</table>

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

### .traverseDfs(srcKey, cb)
Traverses the graph using the depth-first recursive search.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      srcKey: T (number | string)
      <br />
      cb: (key: T, value: U) => void
    </td>
    <td>
      O(V) : V = number of vertices in the graph
    </td>
  </tr>
</table>

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
```

### .traverseBfs(srcKey, cb)
Traverses the graph using the breadth-first search with a queue.

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      srcKey: T (number | string)
      <br />
      cb: (key: T, value: U) => void
    </td>
    <td>
      O(V) : V = number of vertices in the graph
    </td>
  </tr>
</table>

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
```

### .clear()
Clears all vertices and edges in the graph.

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

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
