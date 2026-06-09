//? LeetCode #71
//? Simplify Path
// You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to transform this absolute path into its simplified canonical path.

// The rules of a Unix-style file system are as follows:

// A single period '.' represents the current directory.
// A double period '..' represents the previous/parent directory.
// Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
// Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, '...' and '....' are valid directory or file names.
// The simplified canonical path should follow these rules:

// The path must start with a single slash '/'.
// Directories within the path must be separated by exactly one slash '/'.
// The path must not end with a slash '/', unless it is the root directory.
// The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
// Return the simplified canonical path.

//? Example 1:
// Input: path = "/home/"
// Output: "/home"
// Explanation:
// The trailing slash should be removed.

//? Example 2:
// Input: path = "/home//foo/"
// Output: "/home/foo"
// Explanation:
// Multiple consecutive slashes are replaced by a single one.

//? Example 3:
// Input: path = "/home/user/Documents/../Pictures"
// Output: "/home/user/Pictures"
// Explanation:
// A double period ".." refers to the directory up a level (the parent directory).

//? Example 4:
// Input: path = "/../"
// Output: "/"
// Explanation:
// Going one level up from the root directory is not possible.

//? Example 5:
// Input: path = "/.../a/../b/c/../d/./"
// Output: "/.../b/d"
// Explanation:

// "..." is a valid name for a directory in this problem.

//? Constraints:
// 1 <= path.length <= 3000
// path consists of English letters, digits, period '.', slash '/' or '_'.
// path is a valid absolute Unix path.

//? Approach: Stack
// We can use a stack to keep track of the directories in the path. We will split the input path by the slash '/' character to get the individual components of the path. We will then iterate through these components and apply the following rules:
// If the component is empty or a single period '.', we will ignore it since it does not affect the path.
// If the component is a double period '..', we will pop the last directory from the stack if the stack is not empty, since it represents going up one level in the directory structure.
// If the component is a valid directory name (not empty, not '.', and not '..'), we will push it onto the stack.
// After processing all components, we will join the directories in the stack with a slash '/' to form the simplified path. We will also ensure that the path starts with a slash '/' and does not end with a slash unless it is the root directory.

//? Code:
var simplifyPath = function (path) {
  let stack = [];
  let parts = path.split("/");

  for (let part of parts) {
    if (part === "" || part === ".") {
      continue;
    }
    if (part === "..") {
      stack.pop();
    } else {
      stack.push(part);
    }
  }

  return "/" + stack.join("/");
};

//? Time Complexity: O(n) where n is the length of the input string path. We traverse the path once to split it into components and process each component.
//? Space Complexity: O(n) in the worst case, if all components of the path are valid directory names and we push them onto the stack. In practice, the space used by the stack will be less than n, but it can grow up to O(n) in the worst case.
