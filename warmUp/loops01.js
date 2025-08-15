//* for loop starts with for keyword
//* let i = 0 => initialization
//* i < 5 => condition to be checked on each iteration
//* i = i + 1 => increment on each iteration

//? For Loop
for (let i = 0; i < 5; i = i + 1) {
  console.log("Hello World");
}

//? Task: Print all even numbers in an array

const arr = [1, 12, 15, 18, 29, 32, 98, 117];

for (let i = 0; i < arr.length; i = i + 1) {
  let value = arr[i];
  if (value % 2 === 0) {
    console.log("Even Value", arr[i]);
  }
}

//? While Loop

let i = 0;

while (i < 5) {
  console.log("Hi");
  i = i + 1;
}
