import { DirectedGraph } from '../src/directedGraph';

export class Graph<T extends number|string, U = undefined> extends DirectedGraph<T, U> {
  addVertex(key: T, value: U): Graph<T, U>;
  addEdge(srcKey: T, destKey: T, weight?: number): Graph<T, U>;
}
