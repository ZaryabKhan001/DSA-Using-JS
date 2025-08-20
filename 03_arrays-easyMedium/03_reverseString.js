//? LeetCode #344
//* Reverse String

let s = ["h", "e", "l", "l", "o"];

var reverseString = function (s) {
  let temp = "";
  let arrayLength = s.length;
  let halfArrayLength = Math.floor(arrayLength / 2);
  for (let i = 0; i < halfArrayLength; i = i + 1) {
    temp = s[i];
    s[i] = s[arrayLength - 1 - i];
    s[arrayLength - 1 - i] = temp;
  }
  return s;
};

const reversedString = reverseString(s);
console.log(reversedString);
