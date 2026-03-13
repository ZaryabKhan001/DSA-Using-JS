//? Topological Sort
// It is a linear ordering of nodes of a DAG(Directed Acyclic Graph) such that for every directed edge (u -> v), node u comes before v.

//? Example
// An adjacency list represents a graph.

//  const adj = [
//  [],          // 0
//  [],          // 1
//  [3],         // 2 -> 3
//  [1],         // 3 -> 1
//  [0, 1],      // 4 -> 0, 1
//  [0, 2]       // 5 -> 0, 2

function topologicalSortDFS(n, graph) {
  let ans = [];
  let visited = new Set();

  function dfs(curr) {
    visited.add(curr);

    for (let neighbor of graph[curr]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    ans.push(curr);
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
    }
  }

  return ans.reverse();
}

const n = 6;
const adj = [
  [], // 0
  [], // 1
  [3], // 2 -> 3
  [1], // 3 -> 1
  [0, 1], // 4 -> 0, 1
  [0, 2], // 5 -> 0, 2
];

console.log(topologicalSortDFS(n, adj));
