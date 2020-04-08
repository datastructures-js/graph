// class Graph {
//   constructor() {
//     this.vertices = new Set();
//     this.edges = new Map();
//   }

//   addPath(source, dest, weight) {
//     if (!this.vertices.has(source)) {
//       this.vertices.add(source);
//       this.edges.set(source, new Set());
//     }
//     if (!this.vertices.has(dest)) {
//       this.vertices.add(dest);
//       this.edges.set(dest, new Set());
//     }

//     this.edges.get(source).add(dest);
//   }

//   traverseDfs(source, visited = new Set(), distance = new Map()) {
//     if (this.vertices.has(source) && !visited.has(source)) {
//       visited.add(source);
//       console.log(source);
//       if (!distance.has(source)) {
//         distance.set(source, 0);
//       }
//       for (const connected of this.edges.get(source)) {
//         if (!distance.has(connected) || distance.get(source) + 1 < distance.get(connected)) {
//           distance.set(connected, distance.get(source) + 1);
//         }
//         this.traverseDfs(connected, visited, distance);
//       }
//       return distance;
//     }
//   }

//   traverseBfs(source) {
//     if (this.vertices.has(source)) {
//       const queue = [source];
//       const visited = new Set([source]);
//       const distance = new Map([[source, 0]]);
//       while (queue.length > 0) {
//         const item = queue.shift();
//         console.log(item);
//         for (const connected of this.edges.get(item)) {
//           queue.push(connected);
//           visited.add(connected);
//           if (!distance.has(connected) || distance.get(item) + 1 < distance.get(source)) {
//             distance.set(connected, distance.get(item) + 1);
//           }
//         }
//       }
//       return distance;
//     }
//   }
// }

// const g = new Graph();
// g.addPath('v1', 'v2');
// g.addPath('v1', 'v3');
// g.addPath('v2', 'v5');
// g.addPath('v5', 'v4');

// console.log(g.traverseBfs('v1'));
// console.log(g.traverseDfs('v1'));
