//? For each iteration of outer loop, inner loops completes it's whole cycle.
// for (let i = 0; i < 5; i = i + 1) {
//   for (let j = 0; j < 5; j = j + 1) {
//     console.log(`Runs for ${i} ${j}`);
//   }
// }

//? Some Examples for guessing output of nested loops.

// for (let i = 0; i < 5; i = i + 1) {
//   for (let j = 0; j < i; j = j + 1) {
//     console.log(`Runs for ${i} ${j}`);
//   }
// }

// for (let i = 0; i < 5; i = i + 1) {
//   for (let j = 0; j <= i; j = j + 1) {
//     console.log(`Runs for ${i} ${j}`);
//   }
// }

// for (let i = 0; i < 3; i = i + 1) {
//   for (let j = i; j > 0; j = j - 1) {
//     console.log(`Runs for ${i} ${j}`);
//   }
// }

// for (let i = 0; i < 3; i = i + 1) {
//   for (let j = i; j >= 0; j = j - 1) {
//     console.log(`Runs for ${i} ${j}`);
//   }
// }

for (let i = 5; i > 0; i = i - 1) {
  for (let j = 0; j < i; j = j + 1) {
    console.log(`Runs for ${i} ${j}`);
  }
}
