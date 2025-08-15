//? Write a function that adds two numbers

function add(a, b) {
  return a + b;
}
console.log(add(10, 5));

//? Homework: function for multiplication of two numbers

function multiply(a, b) {
  return a * b;
}
console.log(multiply(10, 3));

//? Task: Write a function that accepts age and tells whether a person is eligible to vote or not.

function isEligibleToVote(age) {
  if (age < 0) return "Invalid age";
  if (age >= 18) return "Eligible to vote";
  return "Not eligible to vote";
}
console.log(isEligibleToVote(5));

//? Task: Write a function that accepts a number and tells it's even or odd.

function isEvenOdd(number) {
  if (number < 0) {
    return "Please enter a positive number";
  } else if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

console.log(isEvenOdd(8));
