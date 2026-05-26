//? Reverse an integer

//* 123 => 321
//* -123 => -321
//* 120 => 21

//? Edge Case
//* if reversed value becomes smaller then -2147483648  returns 0
//* if reversed value becomes greater then 2147483647  returns 0

var reverse = function (x) {
  let reversedNumber = 0;
  let xCopy = x;
  let limit = Math.pow(2, 31);

  x = Math.abs(x);

  while (x > 0) {
    reversedNumber = reversedNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return xCopy < 0
    ? -reversedNumber > -limit
      ? -reversedNumber
      : 0
    : reversedNumber < limit - 1
    ? reversedNumber
    : 0;
};

console.log(reverse(-123));
