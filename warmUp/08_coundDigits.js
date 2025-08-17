//? Write a function which returns the count of a digits in the number.

function countDigits(n) {
  let count = 0;
  if (n === 0) return 1;

  if (n < 0) {
    n = n * -1;
  }
  while (n > 0) {
    n = Math.floor(n / 10);
    count = count + 1;
  }
  return count;
}

let num = 48457;
const result = countDigits(num);
console.log(result);
