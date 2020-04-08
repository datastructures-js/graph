'use strict';

let MinHeap = require('../../tree/heap/minHeap');

class Dijkstra {

    constructor(graph, Graph) {
        this.graph = graph;
        this.Graph = Graph;
    }

    getEdge(vertex, parent, weight) {
        return {
            v: vertex,
            p: parent,
            w: weight
        };
    }

    findShortestPaths(vertex) {
        if (this.graph.hasVertex(vertex)) {
            let shortestPaths = new this.Graph();
            let minHeap = new MinHeap();
            let visited = {};
            let distance = {};
            let distanceWeights = {};

            minHeap.insert(0);
            distance[vertex] = 0;
            distanceWeights[0] = [ this.getEdge(vertex, null, 0) ];

            while (minHeap.getSize() > 0) {

                let minDistance = minHeap.deleteMin();
                let edge = distanceWeights[minDistance].pop();
                visited[edge.v] = true;

                if (edge.p !== null && !shortestPaths.hasVertex(edge.v)) {
                    shortestPaths.addPath(edge.p, edge.v, edge.w);
                }

                let edges = this.graph.getEdges(edge.v);
                for (let v in edges) {
                    if (this.graph.hasEdge(edge.v, v) && !visited[v]) {
                        let weight = this.graph.getWeight(edge.v, v);
                        let newDistance = distance[edge.v] + weight;
                        if (distance[v] === undefined || newDistance < distance[v]) {
                            distance[v] =  newDistance;
                            minHeap.insert(distance[v]);
                            if (!Array.isArray(distanceWeights[distance[v]])) {
                                distanceWeights[distance[v]] = [ this.getEdge(v, edge.v, weight) ];
                            }
                            else {
                                distanceWeights[distance[v]].push(this.getEdge(v, edge.v, weight));
                            }
                        }
                    }
                }   
            }
            return shortestPaths;
        }
        else {
            return null;
        }
    }

}

module.exports = Dijkstra;