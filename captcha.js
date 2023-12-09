'use strict';

function genPassword(number, name) {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return "Invalid input";
  }

  function toScientific(decimal) {
    if (isNaN(decimal)) {
      return "Invalid input";
    }

    // Convert the decimal to a string to manipulate its components
    const decimalStr = decimal.toString();

    // Extract the sign, coefficient, and exponent parts
    const [sign, integerPart, decimalPart] = decimalStr.split(/([+\-]?)(\d+)(\.\d*)?/);

    // Convert the integer and decimal parts into a single-digit coefficient
    const coefficient = (integerPart + (decimalPart || '')).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    // Calculate the exponent based on the length of the integer part
    const exponent = (integerPart.length - 1).toString();

    // Construct the scientific notation string
    const sciNotation = `${sign}${coefficient}e${exponent}`;

    return sciNotation;
  }

  // Transform the decimal number into scientific notation
  const scientificNotation = toScientific(number);

  function toFirstThreeChars(words, digit) {
    return words[digit].split('').filter((char, index) => index < 3).join('');
  }

  // Simplify digits after the decimal point to a single digit
  const simplifiedNotation = scientificNotation
    .replace(/\.|e/g, '')
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0);

  // Create S1 by concatenating the first three letters of each digit when expressed as words
  const s1 = simplifiedNotation
    .toString()
    .split('')
    .map(digit => {
      const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
      return toFirstThreeChars(words, digit);
    })
    .join('');

  // Reduce the exponent to a single digit
  const exponentDigit = parseInt(scientificNotation.split('e')[1], 10)
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0) % 10;

  // Create S2 by concatenating letters at odd positions in the given name
  const s2 = name.split('').filter((char, index) => (index + 1) % 2 !== 0).join('');

  // Combine S1 and S2 with an "@" symbol to form the password
  const finalPassword = `${s1}@${exponentDigit % 2 === 1 ? s2 : ''}`;

  return finalPassword;
}

// Example usage with a test case
const number = "054785949";
const userName = "rajarajeswari";
const password = genPassword(number, userName);
console.log(password);
