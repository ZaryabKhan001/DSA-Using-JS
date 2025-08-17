//? Patterns

//? Pattern 01
// ****
// ****
// ****
// ****

// let n = 4;
// for (let i = 0; i < n; i = i + 1) {
//   let row = "";
//   for (let j = 0; j < n; j = j + 1) {
//     row = row + "*";
//   }
//   console.log(row);
// }

//? Pattern 02
// *
// **
// ***
// ****

// let n = 4;
// for (let i = 0; i < n; i = i + 1) {
//   let row = "";
//   for (let j = 0; j <= i; j = j + 1) {
//     row = row + "*";
//   }
//   console.log(row);
// }

//? Pattern 03
// 1
// 12
// 123
// 1234
// 12345

// let n = 5;
// for (let i = 1; i <= n; i = i + 1) {
//   let row = "";
//   for (let j = 1; j <= i; j = j + 1) {
//     row = row + j;
//   }
//   console.log(row);
// }

//? Pattern 04
// 1
// 22
// 333
// 4444
// 55555

// let n = 5;
// for (let i = 1; i <= n; i = i + 1) {
//   let row = "";
//   for (let j = 1; j <= i; j = j + 1) {
//     row = row + i;
//   }
//   console.log(row);
// }

//? Pattern 05
// 12345
// 1234
// 123
// 12
// 1

// let n = 5;
// for (let i = n; i >= 1; i = i - 1) {
//   let row = "";
//   for (let j = 1; j <= i; j = j + 1) {
//     row = row + j;
//   }
//   console.log(row);
// }

//? Pattern 06
//     *
//    **
//   ***
//  ****
// *****

// let n = 5;
// for (let i = n; i >= 1; i = i - 1) {
//   let row = "";
//   for (let j = 1; j <= n; j = j + 1) {
//     if (j >= i) {
//       row = row + "*";
//     } else {
//       row = row + " ";
//     }
//   }
//   console.log(row);
// }

//? Pattern 07
// 1
// 10
// 101
// 1010
// 10101
// 101010

// let n = 6;
// for (let i = 1; i <= n; i = i + 1) {
//   let row = "";
//   for (let j = 1; j <= i; j = j + 1) {
//     if (j % 2 === 0) {
//       row = row + "0";
//     } else {
//       row = row + "1";
//     }
//   }
//   console.log(row);
// }

//? Pattern 08
// 1
// 01
// 010
// 1010
// 10101

let n = 5;
let toggle = 1;
for (let i = 1; i <= n; i = i + 1) {
  let row = "";
  for (let j = 1; j <= i; j = j + 1) {
    row = row + toggle;
    if (toggle === 1) {
      toggle = 0;
    } else {
      toggle = 1;
    }
  }
  console.log(row);
}
