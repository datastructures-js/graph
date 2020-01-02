const { expect } = require('chai');
const sinon = require('sinon');
const DirectedGraph = require('../src/directedGraph');

describe('DirectedGraph unit tests', () => {
  const directedGraph = new DirectedGraph();

  describe('.addVertex(key, value)', () => {
    it('add vertices the graph', () => {
      directedGraph.addVertex('v1', 1);
      directedGraph.addVertex('v1', 1);
      directedGraph.addVertex('v2', 2);
      directedGraph.addVertex('v3', 3);
      directedGraph.addVertex('v4', 4);
      directedGraph.addVertex('v5', 5);
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

  describe('.verticesCount()', () => {
    it('get the vertices count', () => {
      expect(directedGraph.verticesCount()).to.equal(5);
    });
  });

  describe('edgesCount()', () => {
    it('get the edges count', () => {
      expect(directedGraph.edgesCount()).to.equal(7);
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

  describe('.traverseDfs(srcKey, cb)', () => {
    it('traverse the graph from a starting vertex using DFS', () => {
      const vertices = [];
      directedGraph.traverseDfs('v1', (v) => vertices.push(v.getKey()));
      expect(vertices).to.deep.equal(['v1', 'v2', 'v4', 'v3', 'v5']);
    });
  });

  describe('.traverseBfs(srcKey, cb)', () => {
    it('does nothing when vertex does not exist', () => {
      const cb = sinon.spy();
      directedGraph.traverseBfs('n1', cb);
      expect(cb.calledOnce).to.equal(false);
    });

    it('traverse the graph from a starting vertex using BFS', () => {
      const keys = [];
      const values = [];
      const vertices = [];
      directedGraph.traverseBfs('v1', (v) => {
        keys.push(v.getKey());
        values.push(v.getValue());
        vertices.push(v.serialize());
      });
      expect(keys).to.deep.equal(['v1', 'v2', 'v3', 'v4', 'v5']);
      expect(values).to.deep.equal([1, 2, 3, 4, 5]);
      expect(vertices).to.deep.equal([
        {
          key: 'v1',
          value: 1
        }, {
          key: 'v2',
          value: 2
        }, {
          key: 'v3',
          value: 3
        }, {
          key: 'v4',
          value: 4
        }, {
          key: 'v5',
          value: 5
        }
      ]);
    });
  });

  describe('.removeVertex(key)', () => {
    it('does nothing when vertex does not exist', () => {
      directedGraph.removeVertex('n1');
      expect(directedGraph.verticesCount()).to.equal(5);
      expect(directedGraph.edgesCount()).to.equal(7);
    });

    it('remove a vertex from the graph', () => {
      directedGraph.removeVertex('v5');
      expect(directedGraph.hasVertex('v5')).to.equal(false);
      expect(directedGraph.hasEdge('v3', 'v5')).to.equal(false);
      expect(directedGraph.hasEdge('v4', 'v5')).to.equal(false);
      expect(directedGraph.verticesCount()).to.equal(4);
      expect(directedGraph.edgesCount()).to.equal(5);

      directedGraph.removeVertex('v3');
      expect(directedGraph.hasVertex('v3')).to.equal(false);
      expect(directedGraph.hasEdge('v1', 'v3')).to.equal(false);
      expect(directedGraph.hasEdge('v4', 'v3')).to.equal(false);
      expect(directedGraph.verticesCount()).to.equal(3);
      expect(directedGraph.edgesCount()).to.equal(3);
    });
  });

  describe('.removeEdge(srcKey, destKey)', () => {
    it('does nothing when vertex does not exist', () => {
      directedGraph.removeEdge('n1');
      expect(directedGraph.verticesCount()).to.equal(3);
      expect(directedGraph.edgesCount()).to.equal(3);
    });

    it('remove the edge between two vertices', () => {
      directedGraph.removeEdge('v2', 'v4');
      expect(directedGraph.hasEdge('v2', 'v4')).to.equal(false);
    });
  });

  describe('.removeEdges(key)', () => {
    it('does nothing when vertex does not exist', () => {
      directedGraph.removeEdges('n1');
      expect(directedGraph.edgesCount()).to.equal(2);
    });
  });

  describe('.clear()', () => {
    it('clear the graph', () => {
      directedGraph.clear();
      expect(directedGraph.verticesCount()).to.equal(0);
      expect(directedGraph.edgesCount()).to.equal(0);
    });
  });
});
