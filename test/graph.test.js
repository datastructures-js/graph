const { expect } = require('chai');

const { Graph } = require('../src/graph');

describe('Graph unit tests', () => {
  const graph = new Graph();

  describe('.addVertex(key, value)', () => {
    it('should add vertices the graph', () => {
      expect(graph.addVertex('v1', true)).to.be.instanceof(Graph);
      expect(graph.addVertex('v2', true)).to.be.instanceof(Graph);
      expect(graph.addVertex('v3', true)).to.be.instanceof(Graph);
      expect(graph.addVertex('v4', true)).to.be.instanceof(Graph);
      expect(graph.addVertex('v5', true)).to.be.instanceof(Graph);
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

  describe('.hasEdge(srcKey, destKey)', () => {
    it('should have the added edges', () => {
      expect(graph.hasEdge('v1', 'v2')).to.equal(true);
      expect(graph.hasEdge('v2', 'v1')).to.equal(true);
      expect(graph.hasEdge('v2', 'v3')).to.equal(true);
      expect(graph.hasEdge('v3', 'v2')).to.equal(true);
      expect(graph.hasEdge('v1', 'v3')).to.equal(true);
      expect(graph.hasEdge('v3', 'v1')).to.equal(true);
      expect(graph.hasEdge('v2', 'v4')).to.equal(true);
      expect(graph.hasEdge('v4', 'v2')).to.equal(true);
      expect(graph.hasEdge('v3', 'v4')).to.equal(true);
      expect(graph.hasEdge('v4', 'v3')).to.equal(true);
      expect(graph.hasEdge('v4', 'v5')).to.equal(true);
      expect(graph.hasEdge('v5', 'v4')).to.equal(true);
      expect(graph.hasEdge('v5', 'v3')).to.equal(true);
      expect(graph.hasEdge('v3', 'v5')).to.equal(true);
    });
  });

  describe('.getVerticesCount()', () => {
    it('should get the vertices count', () => {
      expect(graph.getVerticesCount()).to.equal(5);
    });
  });

  describe('.getConnectedVertices(key)', () => {
    it('should the connected vertices keys from a give key', () => {
      expect(graph.getConnectedVertices('v1')).to.eql(['v2', 'v3']);
    });
  });

  describe('getEdgesCount()', () => {
    it('get the edges count', () => {
      expect(graph.getEdgesCount()).to.equal(7);
    });
  });

  describe('.getConnectedEdges(key)', () => {
    it('should the connected edges from a give key', () => {
      expect(graph.getConnectedEdges('v1')).to.eql({
        v2: 2,
        v3: 6
      });
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
      expect(graph.getWeight('v3', 'v10')).to.equal(Infinity);
    });
  });

  describe('.traverseDfs(key, cb, abortCb)', () => {
    it('should traverse the graph from a starting vertex using DFS', () => {
      const vertices = [];
      graph.traverseDfs('v1', (k) => vertices.push(k));
      expect(vertices).to.deep.equal(['v1', 'v2', 'v3', 'v4', 'v5']);
    });

    it('traverse the graph using DFS and allow aborting traversal', () => {
      const vertices = [];
      let counter = 0;
      graph.traverseDfs('v1', (k) => {
        vertices.push(k);
        counter += 1;
      }, () => counter > 2);
      expect(vertices).to.deep.equal(['v1', 'v2', 'v3']);
    });
  });

  describe('.traverseBfs(key, cb, abortCb)', () => {
    it('should traverse the graph from a starting vertex using BFS', () => {
      const keys = [];
      graph.traverseBfs('v5', (k) => keys.push(k));
      expect(keys).to.deep.equal(['v5', 'v4', 'v3', 'v2', 'v1']);
    });

    it('traverse the graph using BFS and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      graph.traverseBfs('v5', (k) => {
        keys.push(k);
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal(['v5', 'v4', 'v3']);
    });
  });

  describe('.removeVertex(key)', () => {
    it('should remove a vertex by its key from the graph', () => {
      graph.removeVertex('v5');
      expect(graph.hasVertex('v5')).to.equal(false);
      expect(graph.hasEdge('v4', 'v5')).to.equal(false);
      expect(graph.hasEdge('v3', 'v5')).to.equal(false);
      expect(graph.getVerticesCount()).to.equal(4);
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
      expect(graph.getEdgesCount()).to.equal(4);
    });

    it('returns the number of removed edges', () => {
      const g = new Graph();
      g.addVertex('v1');
      g.addVertex('v2');
      g.addVertex('v3');
      g.addEdge('v1', 'v2');
      g.addEdge('v1', 'v3');
      expect(g.removeEdges('v1')).to.equal(2);
    });
  });

  describe('.clear()', () => {
    it('should clear the graph', () => {
      graph.clear();
      expect(graph.getVerticesCount()).to.equal(0);
    });
  });
});
