const { expect } = require('chai');
const sinon = require('sinon');
const { DirectedGraph } = require('../src/directedGraph');

describe('DirectedGraph unit tests', () => {
  const directedGraph = new DirectedGraph();

  describe('.addVertex(key, value)', () => {
    it('add vertices the graph', () => {
      expect(directedGraph.addVertex('v1', 1)).to.be.instanceof(DirectedGraph);
      expect(directedGraph.addVertex('v1', 1)).to.be.instanceof(DirectedGraph);
      expect(directedGraph.addVertex('v2', 2)).to.be.instanceof(DirectedGraph);
      expect(directedGraph.addVertex('v3', 3)).to.be.instanceof(DirectedGraph);
      expect(directedGraph.addVertex('v4', 4)).to.be.instanceof(DirectedGraph);
      expect(directedGraph.addVertex('v5', 5)).to.be.instanceof(DirectedGraph);
    });
  });

  describe('.addEdge(srcKey, destKey, weight)', () => {
    it('add unidirectional edge between two vertices', () => {
      directedGraph.addEdge('v1', 'v2', 2);
      directedGraph.addEdge('v1', 'v3', 3);
      directedGraph.addEdge('v1', 'v4', 1);
      directedGraph.addEdge('v2', 'v4');
      directedGraph.addEdge('v3', 'v5', 2);
      directedGraph.addEdge('v4', 'v3');
      directedGraph.addEdge('v4', 'v5', 4);
    });
  });

  describe('.hasVertex(key)', () => {
    it('has the added vertices', () => {
      expect(directedGraph.hasVertex('v1')).to.equal(true);
      expect(directedGraph.hasVertex('v2')).to.equal(true);
      expect(directedGraph.hasVertex('v3')).to.equal(true);
      expect(directedGraph.hasVertex('v4')).to.equal(true);
      expect(directedGraph.hasVertex('v5')).to.equal(true);
    });
  });

  describe('.hasEdge(srcKey, destKey)', () => {
    it('throws error if source vertex does not exist', () => {
      expect(() => directedGraph.addEdge('n1', 'v2')).to.throw(Error)
        .and.to.have.property('message', 'addEdge: vertex "n1" not found');
    });

    it('throws error if destination vertex does not exist', () => {
      expect(() => directedGraph.addEdge('v1', 'n2')).to.throw(Error)
        .and.to.have.property('message', 'addEdge: vertex "n2" not found');
    });

    it('has the added edges as one-way direction', () => {
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
    });
  });

  describe('.getVerticesCount()', () => {
    it('get the vertices count', () => {
      expect(directedGraph.getVerticesCount()).to.equal(5);
    });
  });

  describe('.getConnectedVertices(key)', () => {
    it('should the connected vertices keys from a give key', () => {
      expect(directedGraph.getConnectedVertices('v4')).to.eql(['v3', 'v5']);
    });
  });

  describe('getEdgesCount()', () => {
    it('get the edges count', () => {
      expect(directedGraph.getEdgesCount()).to.equal(7);
    });
  });

  describe('.getConnectedEdges(key)', () => {
    it('should the connected edges from a give key', () => {
      expect(directedGraph.getConnectedEdges('v4')).to.eql({
        v3: 1,
        v5: 4
      });
    });
  });

  describe('.getWeight(srcKey, destKey)', () => {
    it('get the edge weight between two vertices', () => {
      expect(directedGraph.getWeight('v1', 'v2')).to.equal(2);
      expect(directedGraph.getWeight('v1', 'v3')).to.equal(3);
      expect(directedGraph.getWeight('v1', 'v4')).to.equal(1);
      expect(directedGraph.getWeight('v3', 'v5')).to.equal(2);
      expect(directedGraph.getWeight('v4', 'v5')).to.equal(4);
    });

    it('has a default weight of 1', () => {
      expect(directedGraph.getWeight('v2', 'v4')).to.equal(1);
      expect(directedGraph.getWeight('v4', 'v3')).to.equal(1);
    });
  });

  describe('.traverseDfs(srcKey, cb, abortCb)', () => {
    it('traverse the graph from a starting vertex using DFS', () => {
      const vertices = [];
      directedGraph.traverseDfs('v1', (k) => vertices.push(k));
      expect(vertices).to.deep.equal(['v1', 'v2', 'v4', 'v3', 'v5']);
    });

    it('traverse the graph using DFS and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      directedGraph.traverseBfs('v1', (k) => {
        keys.push(k);
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal(['v1', 'v2', 'v3']);
    });
  });

  describe('.traverseBfs(srcKey, cb, abortCb)', () => {
    it('does nothing when vertex does not exist', () => {
      const cb = sinon.spy();
      directedGraph.traverseBfs('n1', cb);
      expect(cb.calledOnce).to.equal(false);
    });

    it('traverse the graph from a starting vertex using BFS', () => {
      const keys = [];
      const values = [];
      directedGraph.traverseBfs('v1', (k, v) => {
        keys.push(k);
        values.push(v);
      });
      expect(keys).to.deep.equal(['v1', 'v2', 'v3', 'v4', 'v5']);
      expect(values).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('traverse the graph using BFS and allow aborting traversal', () => {
      const keys = [];
      let counter = 0;
      directedGraph.traverseBfs('v1', (k) => {
        keys.push(k);
        counter += 1;
      }, () => counter > 2);
      expect(keys).to.deep.equal(['v1', 'v2', 'v3']);
    });
  });

  describe('.removeVertex(key)', () => {
    it('does nothing when vertex does not exist', () => {
      expect(directedGraph.removeVertex('n1')).to.equal(false);
      expect(directedGraph.getVerticesCount()).to.equal(5);
      expect(directedGraph.getEdgesCount()).to.equal(7);
    });

    it('remove a vertex from the graph', () => {
      expect(directedGraph.removeVertex('v5')).to.equal(true);
      expect(directedGraph.hasVertex('v5')).to.equal(false);
      expect(directedGraph.hasEdge('v3', 'v5')).to.equal(false);
      expect(directedGraph.hasEdge('v4', 'v5')).to.equal(false);
      expect(directedGraph.getVerticesCount()).to.equal(4);
      expect(directedGraph.getEdgesCount()).to.equal(5);

      expect(directedGraph.removeVertex('v3')).to.equal(true);
      expect(directedGraph.hasVertex('v3')).to.equal(false);
      expect(directedGraph.hasEdge('v1', 'v3')).to.equal(false);
      expect(directedGraph.hasEdge('v4', 'v3')).to.equal(false);
      expect(directedGraph.getVerticesCount()).to.equal(3);
      expect(directedGraph.getEdgesCount()).to.equal(3);
    });
  });

  describe('.removeEdge(srcKey, destKey)', () => {
    it('does nothing when vertex does not exist', () => {
      expect(directedGraph.removeEdge('n1', 'n2')).to.equal(false);
      expect(directedGraph.getVerticesCount()).to.equal(3);
      expect(directedGraph.getEdgesCount()).to.equal(3);
    });

    it('remove the edge between two vertices', () => {
      expect(directedGraph.removeEdge('v2', 'v4')).to.equal(true);
      expect(directedGraph.hasEdge('v2', 'v4')).to.equal(false);
    });
  });

  describe('.removeEdges(key)', () => {
    it('does nothing when vertex does not exist', () => {
      expect(directedGraph.removeEdges('n1')).to.equal(0);
      expect(directedGraph.getEdgesCount()).to.equal(2);
    });

    it('returns the number of removed edges', () => {
      const g = new DirectedGraph();
      g.addVertex('v1');
      g.addVertex('v2');
      g.addVertex('v3');
      g.addEdge('v1', 'v2');
      g.addEdge('v2', 'v1');
      g.addEdge('v1', 'v3');
      expect(g.removeEdges('v1')).to.equal(3);
    });
  });

  describe('.clear()', () => {
    it('clear the graph', () => {
      directedGraph.clear();
      expect(directedGraph.getVerticesCount()).to.equal(0);
      expect(directedGraph.getEdgesCount()).to.equal(0);
    });
  });
});
