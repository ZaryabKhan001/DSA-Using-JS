.

---

# Graphs – Quick Notes

## What is a Graph

A **Graph** is a data structure used to represent **relationships between objects**.

Mathematically:

```
G = (V, E)
```

- **V (Vertices / Nodes)** → objects
- **E (Edges)** → connections between nodes

---

# Basic Concepts

## Vertices (Nodes)

Entities in the graph.

Example:

```
A, B, C, D
```

---

## Edges

Connections between nodes.

Example:

```
A — B
B — C
```

---

## Degree

Number of edges connected to a node.

Example:

```
Node 3 → degree = 4
Node 7 → degree = 2
Node 2 → degree = 1
```

---

## Path

A sequence of nodes used to travel from one node to another.

Example:

```
2 → 7 → 3 → 5
2 → 7 → 3 → 6 → 9
2 → 7 → 3 → 1 → 6 → 9
```

A graph may have:

- Multiple paths
- One path
- No path

---

## Cycle

A **cycle** occurs when we start from a node and reach the same node again.

Example:

```
3 → 1 → 6 → 3
```

---

# Types of Graphs

## 1. Undirected Graph

Edges have **no direction**.

Example:

```
A — B
B — C
```

Use cases:

- Facebook friends
- Road networks

---

## 2. Directed Graph (Digraph)

Edges have **direction**.

Example:

```
A → B
B → C
```

Use cases:

- Instagram followers
- Web links
- Dependencies

---

## 3. Weighted Graph

Edges have **cost / distance / weight**.

Example:

```
A --5--> B
B --3--> C
```

Weights can represent:

- Distance
- Time
- Price

---

## 4. Unweighted Graph

All edges are treated equally.

You only care about **connections**, not cost.

---

## 5. Cyclic Graph

Graph contains **at least one cycle**.

---

## 6. Acyclic Graph

Graph **does not contain cycles**.

---

## 7. Directed Acyclic Graph (DAG)

A **directed graph with no cycles**.

Examples:

- NPM dependencies
- Git version history
- Task scheduling

---

# Directed Graph Properties

## Indegree

Number of edges **coming into** a node.

Example:

```
A → C
B → C

Indegree(C) = 2
```

---

## Outdegree

Number of edges **going out** of a node.

Example:

```
C → D
C → E

Outdegree(C) = 2
```

---

# Graph Connectivity

## Connected Graph

Every node is reachable from another node.

Example:

```
A → B → C → D
```

---

## Disconnected Graph

Graph has **separate components**.

Example uses:

- Friend groups
- Network clusters

---

# Real World Examples

## Social Networks

Users = Nodes
Friendships = Edges

Example:

```
B → A
B → C
B → D
```

Degree of **B = 3**

---

## Maps / Cities

Cities = Nodes
Roads = Edges

Example paths:

```
Jaipur → Delhi → Dehradun → Mussoorie
Jaipur → Delhi → Chandigarh → Dehradun → Mussoorie
```

---

# Quick Summary

Graph = **Nodes + Connections**

Main ideas:

- Degree
- Path
- Cycle
- Directed / Undirected
- Weighted / Unweighted
- Connected / Disconnected

---

If you want, I can also give you a **very powerful Graph README structure used by FAANG engineers** that includes:

- Graph Representations (Adjacency List / Matrix)
- BFS
- DFS
- Topological Sort
- Shortest Path
- Union Find

It becomes a **complete Graph DSA cheat sheet** for your repo.
