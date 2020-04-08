'use strict';

let MinHeap = require('../../tree/heap/minHeap');

class Prim {

    constructor(graph, Graph) {
        this.graph = graph;
        this.Graph = Graph;
    }

    getEdge(vertex, parent) {
        return {
            v: vertex,
            p: parent
        };
    }

    findMst() {
        let mst = new this.Graph();
        let minHeap = new MinHeap();
        let weights = {};

        for (let vertex in this.graph.getVertices()) {
            minHeap.insert(0);
            weights[0] = [ this.getEdge(vertex, null) ];
            break;
        }

        while (minHeap.getSize() > 0) {
            let minWeight = minHeap.deleteMin();
            let edge = weights[minWeight].pop();

            if (!mst.hasVertex(edge.v)) {
                if (edge.p !== null) {
                    mst.addPath(edge.p, edge.v, minWeight);
                }
                let edges = this.graph.getEdges(edge.v);
                for (let v in edges) {
                    if (this.graph.hasEdge(edge.v, v) && !mst.hasVertex(v)) {
                        let weight = this.graph.getWeight(edge.v, v);
                        minHeap.insert(weight);
                        if (!Array.isArray(weights[weight])) {
                            weights[weight] = [ this.getEdge(v, edge.v) ];
                        }
                        else {
                            weights[weight].push(this.getEdge(v, edge.v));
                        }
                    }
                }                
            }
        }
        return mst;
    }

}

module.exports = Prim;