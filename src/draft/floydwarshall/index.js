'use strict';

class FloydWarshall {

    constructor(graph) {
        this.graph = graph;
    }

    findShortestPathPairs() {
        let shortestPathPairs = {};
        let vertices = this.graph.getVertices();

        for (let a in vertices) {
            shortestPathPairs[a] = {};
            for (let b in vertices) {
                shortestPathPairs[a][b] = this.graph.getWeight(a, b);
            }
        }

        for (let k in vertices) {
            for (let i in vertices) {
                for (let j in vertices) {
                    if (shortestPathPairs[i][j] > shortestPathPairs[i][k] + shortestPathPairs[k][j]) {
                        shortestPathPairs[i][j] = shortestPathPairs[i][k] + shortestPathPairs[k][j];
                    }
                }
            }
        }

        return shortestPathPairs;
    }

}

module.exports = FloydWarshall;