const { expect } = require('chai');
const Graph = require('../src/graph');

describe('Graph unit tests', () => {
  const graph = new Graph();

  describe('.addVertex(key, value)', () => {
    it('should add vertices the graph', () => {
      graph.addVertex('v1', true);
      graph.addVertex('v2', true);
      graph.addVertex('v3', true);
      graph.addVertex('v4', true);
      graph.addVertex('v5', true);
    });
  });

  describe('.addEdge(srcKey, destKey, weight)', () => {
    it('should add two-ways edge between two vertices', () => {
      graph.addEdge('v1', 'v2', 2);
      graph.addEdge('v2', 'v3', 3);
      graph.addEdge('v1', 'v3', 6);
      graph.addEdge('v2', 'v4', 1);
      graph.addEdge('v4', 'v3', 1);
      graph.addEdge('v4', 'v5', 4);
      graph.addEdge('v3', 'v5', 2);
    });
  });

  describe('.hasVertex(key)', () => {
    it('should have the added vertices', () => {
      expect(graph.hasVertex('v1')).to.equal(true);
      expect(graph.hasVertex('v2')).to.equal(true);
      expect(graph.hasVertex('v3')).to.equal(true);
      expect(graph.hasVertex('v4')).to.equal(true);
      expect(graph.hasVertex('v5')).to.equal(true);
    });
  });

  describe('.hasEdge(v1, v2)', () => {
    it('should have the added edges', () => {
      expect(graph.hasEdge('v1', 'v2')).to.equal(true);
      expect(graph.hasEdge('v2', 'v3')).to.equal(true);
      expect(graph.hasEdge('v1', 'v3')).to.equal(true);
      expect(graph.hasEdge('v2', 'v4')).to.equal(true);
      expect(graph.hasEdge('v3', 'v4')).to.equal(true);
      expect(graph.hasEdge('v1', 'v2')).to.equal(true);
      expect(graph.hasEdge('v4', 'v5')).to.equal(true);
      expect(graph.hasEdge('v5', 'v3')).to.equal(true);
    });
  });

  describe('.verticesCount()', () => {
    it('should get the vertices count', () => {
      expect(graph.verticesCount()).to.equal(5);
    });
  });

  describe('edgesCount()', () => {
    it('get the edges count', () => {
      expect(graph.edgesCount()).to.equal(7);
    });
  });

  describe('.getWeight(srcKey, destKey)', () => {
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
    });
  });

  describe('.traverseDfs(key, cb, type)', () => {
    it('should traverse the graph from a starting vertex using DFS', () => {
      const vertices = [];
      graph.traverseDfs('v1', (v) => vertices.push(v.getKey()));
      expect(vertices).to.deep.equal(['v1', 'v2', 'v3', 'v4', 'v5']);
    });
  });

  describe('.traverseBfs(key, cb)', () => {
    it('should traverse the graph from a starting vertex using BFS', () => {
      const vertices = [];
      graph.traverseBfs('v5', (v) => vertices.push(v.getKey()));
      expect(vertices).to.deep.equal(['v5', 'v4', 'v3', 'v2', 'v1']);
    });
  });

  describe('.removeVertex(key)', () => {
    it('should remove a vertex by its key from the graph', () => {
      graph.removeVertex('v5');
      expect(graph.hasVertex('v5')).to.equal(false);
      expect(graph.hasEdge('v4', 'v5')).to.equal(false);
      expect(graph.hasEdge('v3', 'v5')).to.equal(false);
      expect(graph.verticesCount()).to.equal(4);
    });
  });

  describe('.removeEdge(srcKey, destKey)', () => {
    it('should remove the edge between two vertices', () => {
      graph.removeEdge('v2', 'v3');
      expect(graph.hasEdge('v2', 'v3')).to.equal(false);
    });
  });

  describe('.removeEdges(key)', () => {
    it('does nothing when vertex does not exist', () => {
      graph.removeEdges('n1');
      expect(graph.edgesCount()).to.equal(4);
    });
  });

  describe('.clear()', () => {
    it('should clear the graph', () => {
      graph.clear();
      expect(graph.verticesCount()).to.equal(0);
    });
  });
});
