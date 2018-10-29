const { expect } = require('chai');
const graphFn = require('../../graph');
const dfsFn = require('./index');

describe('graph dfs shortest path test', () => {
  const graph = graphFn();

  graph.addVertex('v1', true);
  graph.addVertex('v2', true);
  graph.addVertex('v3', true);
  graph.addVertex('v4', true);
  graph.addVertex('v5', true);

  graph.addEdge('v1', 'v2', 2);
  graph.addEdge('v2', 'v3', 3);
  graph.addEdge('v1', 'v3', 6);
  graph.addEdge('v2', 'v4', 1);
  graph.addEdge('v4', 'v3', 1);
  graph.addEdge('v4', 'v5', 4);
  graph.addEdge('v3', 'v5', 2);

  const dfs = dfsFn(graph);

  it('should find shortest paths between two vertices', () => {
    expect(dfs('v1', 'v5')).to.deep.equal([
      ['v1', 'v2', 'v4', 'v3', 'v5']
    ]);

    expect(dfs('v3', 'v1')).to.deep.equal([
      ['v3', 'v4', 'v2', 'v1']
    ]);
  });
});

describe('directed graph test', () => {
  const directedGraph = graphFn({ directed: true });
  directedGraph.addVertex('v1', true);
  directedGraph.addVertex('v2', true);
  directedGraph.addVertex('v3', true);
  directedGraph.addVertex('v4', true);
  directedGraph.addVertex('v5', true);

  directedGraph.addEdge('v1', 'v2', 2);
  directedGraph.addEdge('v1', 'v3', 3);
  directedGraph.addEdge('v1', 'v4', 1);
  directedGraph.addEdge('v2', 'v4', 1);
  directedGraph.addEdge('v3', 'v5', 2);
  directedGraph.addEdge('v4', 'v3', 1);
  directedGraph.addEdge('v4', 'v5', 4);

  const dfs = dfsFn(directedGraph);

  it('should find the shortest path between two vertices', () => {
    expect(dfs('v1', 'v5')).to.deep.equal([
      ['v1', 'v4', 'v3', 'v5']
    ]);
  });
});
