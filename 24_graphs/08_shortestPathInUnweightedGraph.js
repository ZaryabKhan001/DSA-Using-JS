//? Shortest Path [Unweighted Graph]

// Here, We have to do ‘Level Order Traversal’

//       function shortestDistance(graph, src){
//         let n = graph.length;
//         const dist = new Array(n).fill(Infinity);
//         dist[src] = 0;

//         let q = [src];
//         while(q.length) {
//           let curr = q.shift();
//           for(let neighbor of graph[curr]) {
//             if(dist[neighbor] == Infinity) {
//               dist[neighbor] = dist[curr] + 1;
//               q.push(neighbor);
//             }
//           }
//         }
//         return dist;
//       }

//       const graph = [
//         [1, 2],   // 0
//         [3],      // 1
//         [4],      // 2
//         [5],      // 3
//         [3],      // 4
//         []        // 5
//       ];

//? Time Complexity: O(V + E)
//? Space Complexity: O(E)
// Here: V = Vertices, E = Edges
//? Note:
// If you have an undirected graph, you can represent it as a directed graph by adding edges in both directions.

//* This returns the shortest distance of all the vertices from the source vertex. If you want to return the shortest path, you can maintain a parent array to reconstruct the path after reaching the destination vertex.

const getShortestPath = (s, d, graph) => {
  let queue = [s];
  let parent = {};

  while (queue.length) {
    const curr = queue.shift();

    if (curr === d) break;

    for (let neighbour of graph[curr]) {
      if (parent[neighbour] === undefined) {
        parent[neighbour] = curr;
      }
      queue.push(neighbour);
    }
  }

  //* reconstruct path
  const path = [d];
  let start = s;
  let end = d;
  while (start !== end) {
    path.unshift(parent[end]);
    end = parent[end];
  }

  return path;
};

const graph = [[1, 2], [3], [4], [5], [3], []];
console.log(getShortestPath(0, 5, graph));

//? Time Complexity: O(V + E)
//? Space Complexity: O(E)
