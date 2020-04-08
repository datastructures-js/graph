'use strict';

let sorter = require('sort-algorithms-js');

class Kruskal {

    constructor(graph, Graph) {
        this.graph = graph;
        this.Graph = Graph;
    }

    sortWeightsList() {
        return sorter.mergeSort(this.graph.getWeightsList());
    }

    findMst() {
        let mst = new this.Graph();
        let sortedWeights = this.sortWeightsList();
        let weights = this.graph.getWeights();

        for (let w of sortedWeights) {
            for (let edge of weights[w]) {
                if (!mst.hasVertex(edge[0]) || !mst.hasVertex(edge[1])) {
                    mst.addPath(edge[0], edge[1], w);
                }
            }
        }

        return mst;
    }

}

module.exports = Kruskal;