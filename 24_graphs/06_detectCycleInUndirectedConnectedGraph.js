const buildAdjacencyList = (edges) => {
  if (!edges.length) return;
  const map = {};

  for (let i = 0; i < edges.length; i = i + 1) {
    const u = edges[i][0];
    const v = edges[i][1];

    if (!map[u]) map[u] = [];
    if (!map[v]) map[v] = [];

    map[u].push(v);
    map[v].push(u);
  }

  return map;
};

function hasCycle(edges) {
  // your solution here
  const visited = new Set();
  const map = buildAdjacencyList(edges);

  const traversal = (curr, parent) => {
    visited.add(curr);

    const neighbours = map[curr] || [];

    for (let neighbour of neighbours) {
      if (!visited.has(neighbour)) {
        return traversal(neighbour, curr);
      } else if (neighbour !== parent) {
        return true;
      }
    }
    return false;
  };

  return traversal(edges[0][0], -1);
}

module.exports = { hasCycle };
