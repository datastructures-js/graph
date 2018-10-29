const { expect } = require('chai');
const graphFn = require('./graph');

describe('graph test', () => {
  const graph = graphFn();

  describe('.addVertex(key, value)', () =>
    it('should add vertices the graph', () => {
      graph.addVertex('v1', true);
      graph.addVertex('v2', true);
      graph.addVertex('v3', true);
      graph.addVertex('v4', true);
      graph.addVertex('v5', true);
    }));

  describe('.addEdge(key1, key2, weight)', () =>
    it('should add two-ways edge between two vertices', () => {
      graph.addEdge('v1', 'v2', 2);
      graph.addEdge('v2', 'v3', 3);
      graph.addEdge('v1', 'v3', 6);
      graph.addEdge('v2', 'v4', 1);
      graph.addEdge('v4', 'v3', 1);
      graph.addEdge('v4', 'v5', 4);
      graph.addEdge('v3', 'v5', 2);
    }));

  describe('.hasVertex(key)', () =>
    it('should have the added vertices', () => {
      expect(graph.hasVertex('v1')).to.equal(true);
      expect(graph.hasVertex('v2')).to.equal(true);
      expect(graph.hasVertex('v3')).to.equal(true);
      expect(graph.hasVertex('v4')).to.equal(true);
      expect(graph.hasVertex('v5')).to.equal(true);
    }));

  describe('.hasEdge(v1, v2)', () =>
    it('should have the added edges', () => {
      expect(graph.hasEdge('v1', 'v2')).to.equal(true);
      expect(graph.hasEdge('v2', 'v3')).to.equal(true);
      expect(graph.hasEdge('v1', 'v3')).to.equal(true);
      expect(graph.hasEdge('v2', 'v4')).to.equal(true);
      expect(graph.hasEdge('v3', 'v4')).to.equal(true);
      expect(graph.hasEdge('v1', 'v2')).to.equal(true);
      expect(graph.hasEdge('v4', 'v5')).to.equal(true);
      expect(graph.hasEdge('v5', 'v3')).to.equal(true);
    }));

  describe('.countVertices()', () =>
    it('should get the vertices count', () =>
      expect(graph.countVertices()).to.equal(5)));

  describe('.getWeight(key1, key2)', () =>
    it('should get the edge\'s weight between two vertices', () => {
      expect(graph.getWeight('v1', 'v2')).to.equal(2);
      expect(graph.getWeight('v2', 'v3')).to.equal(3);
      expect(graph.getWeight('v1', 'v3')).to.equal(6);
      expect(graph.getWeight('v2', 'v4')).to.equal(1);
      expect(graph.getWeight('v3', 'v4')).to.equal(1);
      expect(graph.getWeight('v4', 'v5')).to.equal(4);
      expect(graph.getWeight('v3', 'v5')).to.equal(2);
      expect(graph.getWeight('v5', 'v5')).to.equal(0);
      expect(graph.getWeight('v3', 'v10')).to.equal(null);
    }));

  describe('.traverse(key, cb, type)', () => {
    it('should traverse the graph from a starting vertex using DFS', () => {
      const vertices = [];
      graph.traverse('v1', v => vertices.push(v.getKey()), 'dfs');
      expect(vertices).to.deep.equal(['v1', 'v2', 'v3', 'v4', 'v5']);
    });

    it('should traverse the graph from a starting vertex using BFS', () => {
      const vertices = [];
      graph.traverse('v5', v => vertices.push(v.getKey()), 'bfs');
      expect(vertices).to.deep.equal(['v5', 'v4', 'v3', 'v2', 'v1']);
    });
  });

  describe('.findShortestPath(key1, key2)', () =>
    it('should find shortest paths between two vertices using DFS', () => {
      expect(graph.findShortestPath('v1', 'v5'))
        .to.deep.equal([['v1', 'v2', 'v4', 'v3', 'v5']]);

      expect(graph.findShortestPath('v3', 'v1'))
        .to.deep.equal([['v3', 'v4', 'v2', 'v1']]);
    }));

  describe('.removeVertex(key)', () =>
    it('should remove a vertex by its key from the graph', () => {
      graph.removeVertex('v5');
      expect(graph.hasVertex('v5')).to.equal(false);
      expect(graph.hasEdge('v4', 'v5')).to.equal(false);
      expect(graph.hasEdge('v3', 'v5')).to.equal(false);
      expect(graph.countVertices()).to.equal(4);
    }));

  describe('.removeEdge(key1, key2)', () =>
    it('should remove the edge between two vertices', () => {
      graph.removeEdge('v2', 'v3');
      expect(graph.hasEdge('v2', 'v3')).to.equal(false);
    }));

  describe('.clear()', () =>
    it('should clear the graph', () => {
      graph.clear();
      expect(graph.countVertices()).to.equal(0);
    }));
});

describe('directed graph test', () => {
  const directedGraph = graphFn({ directed: true });

  describe('.addVertex(key, value)', () =>
    it('should add vertices the graph', () => {
      directedGraph.addVertex('v1', true);
      directedGraph.addVertex('v2', true);
      directedGraph.addVertex('v3', true);
      directedGraph.addVertex('v4', true);
      directedGraph.addVertex('v5', true);
    }));

  describe('.addEdge(key1, key2, weight)', () => {
    it('should add one-way edge between two vertices', () => {
      directedGraph.addEdge('v1', 'v2', 2);
      directedGraph.addEdge('v1', 'v3', 3);
      directedGraph.addEdge('v1', 'v4', 1);
      directedGraph.addEdge('v2', 'v4', 1);
      directedGraph.addEdge('v3', 'v5', 2);
      directedGraph.addEdge('v4', 'v3', 1);
      directedGraph.addEdge('v4', 'v5', 4);
    });
  });

  describe('.hasVertex(key)', () =>
    it('should have the added vertices', () => {
      expect(directedGraph.hasVertex('v1')).to.equal(true);
      expect(directedGraph.hasVertex('v2')).to.equal(true);
      expect(directedGraph.hasVertex('v3')).to.equal(true);
      expect(directedGraph.hasVertex('v4')).to.equal(true);
      expect(directedGraph.hasVertex('v5')).to.equal(true);
    }));

  describe('.hasEdge(key1, key2)', () =>
    it('should have the added edges as one-way direction', () => {
      expect(directedGraph.hasEdge('v1', 'v2')).to.equal(true);
      expect(directedGraph.hasEdge('v1', 'v3')).to.equal(true);
      expect(directedGraph.hasEdge('v1', 'v4')).to.equal(true);
      expect(directedGraph.hasEdge('v2', 'v4')).to.equal(true);
      expect(directedGraph.hasEdge('v3', 'v5')).to.equal(true);
      expect(directedGraph.hasEdge('v4', 'v3')).to.equal(true);
      expect(directedGraph.hasEdge('v4', 'v5')).to.equal(true);

      expect(directedGraph.hasEdge('v2', 'v1')).to.equal(false);
      expect(directedGraph.hasEdge('v3', 'v1')).to.equal(false);
      expect(directedGraph.hasEdge('v4', 'v1')).to.equal(false);
      expect(directedGraph.hasEdge('v4', 'v2')).to.equal(false);
      expect(directedGraph.hasEdge('v5', 'v3')).to.equal(false);
      expect(directedGraph.hasEdge('v3', 'v4')).to.equal(false);
      expect(directedGraph.hasEdge('v5', 'v4')).to.equal(false);
    }));

  describe('.countVertices()', () =>
    it('should get the vertices count', () =>
      expect(directedGraph.countVertices()).to.equal(5)));

  describe('.getWeight(key1, key2)', () =>
    it('should get the edge\'s weight between two vertices', () => {
      expect(directedGraph.getWeight('v1', 'v2')).to.equal(2);
      expect(directedGraph.getWeight('v1', 'v3')).to.equal(3);
      expect(directedGraph.getWeight('v1', 'v4')).to.equal(1);
      expect(directedGraph.getWeight('v2', 'v4')).to.equal(1);
      expect(directedGraph.getWeight('v3', 'v5')).to.equal(2);
      expect(directedGraph.getWeight('v4', 'v3')).to.equal(1);
      expect(directedGraph.getWeight('v4', 'v5')).to.equal(4);
    }));

  describe('.traverse(key, cb, type)', () => {
    it('should traverse the graph from a starting vertex using DFS', () => {
      const vertices = [];
      directedGraph.traverse('v1', v => vertices.push(v.getKey()), 'dfs');
      expect(vertices).to.deep.equal(['v1', 'v2', 'v4', 'v3', 'v5']);
    });

    it('should traverse the graph from a starting vertex using BFS', () => {
      const vertices = [];
      directedGraph.traverse('v1', v => vertices.push(v.getKey()), 'bfs');
      expect(vertices).to.deep.equal(['v1', 'v2', 'v3', 'v4', 'v5']);
    });
  });

  describe('.findShortestPaths(v1, v2)', () =>
    it('should find the shortest path between two vertices', () => {
      expect(directedGraph.findShortestPath('v1', 'v5'))
        .to.deep.equal([['v1', 'v4', 'v3', 'v5']]);
    }));

  describe('.removeVertex(vertex)', () =>
    it('should remove a vertex from the graph', () => {
      directedGraph.removeVertex('v5');
      expect(directedGraph.hasVertex('v5')).to.equal(false);
      expect(directedGraph.hasEdge('v3', 'v5')).to.equal(false);
      expect(directedGraph.hasEdge('v4', 'v5')).to.equal(false);
      expect(directedGraph.countVertices()).to.equal(4);
    }));

  describe('.removeEdge(v1, v2)', () =>
    it('should remove the edge between two vertices', () => {
      directedGraph.removeEdge('v2', 'v4');
      expect(directedGraph.hasEdge('v2', 'v4')).to.equal(false);
    }));

  describe('.clear()', () =>
    it('should clear the graph', () => {
      directedGraph.clear();
      expect(directedGraph.countVertices()).to.equal(0);
    }));
});
