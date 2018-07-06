// REMEMBER: Arrays & Objects are reference type

// #1. Pure Function - Predictable return state
class ProfileManager {
  constructor() {}

  // Writing Pure Function
  createUsername(user) {
    return `${user.firstName} ${user.lastName} ${user.id}`;
  }

  createProfile(domain, username) {
    return `Domain: ${domain}, Username: ${username}`;
  }
}

const user = {
  id: 7865,
  firstName: 'John',
  lastName: 'Doe',
};

const manager = new ProfileManager();
const profileUrl = manager.createProfile('https://social.com', manager.createUsername(user));
console.log(profileUrl);

// #2. Avoiding Side effects with
// Object.assign(target, source) - copies all enumerable own properties of the sources to the target object
// Spread Operator - copies all enumerable properties

const readings = {
  coreTemp: 74,
  additionalTemp: 80,
  readingA: 178,
  readingB: 120,
  readingC: -190,
};

function adjustReadings(reading) {
  reading.readingA -= 20;
  reading.readingB += reading.coreTemp / 2;
  return reading;
}

function testReadingA(readingA) {
  return readingA >= 170;
}

readings; // ?
const newReadingsUsingSpread = adjustReadings({ ...readings });
newReadingsUsingSpread; // ?
testReadingA(readings.readingA); // ?
const newReadingsUsingObject = adjustReadings(Object.assign({}, readings));
newReadingsUsingObject; // ?

// #3.
// forEach - accepts function argument and then iterates over every object or item in the array calling that function to that object
// map - same as forEach but constructs an entirely new array from the values return from the function

const tasks = [
  { task: 'Buy eggs', completed: false },
  { task: 'Buy eggs', completed: true },
  { task: 'Buy eggs', completed: true },
  { task: 'Buy eggs', completed: false },
];

function makePending(tasks) {
  // tasks.forEach((task, index) => {
  //   task.completed = false;
  // });
  return tasks.map((tasked, index) => ({
    ...tasked,
    id: index + 1,
  }));
}

tasks; // ?
const newPending = makePending(tasks);
newPending; // ?

// #4 Reduce - returns always a single value

// Task: Iterate all numbers
// If a number is even -> take its half a nd sum it
// If a number is odd -> sum it

const numbers = [2, 9, 8, 7, 6];

function isEven(num) {
  return num % 2 === 0;
}

function numberSum(number) {
  // accumulator holds the total
  return number.reduce((accumulator, current) => {
    if (isEven(current)) {
      return accumulator + current / 2;
    }
    return accumulator + current;
  }, 0);
}

const total = numberSum(numbers);
total; // ?

// #5 Filter - Get the portion of an array

const EvenOddNumbers = [6, 8, 3, 14, 1, 9, 10];

function getEvenNumbers(numerals) {
  return numerals.filter(num => num % 2 === 0);
}

console.log(getEvenNumbers(EvenOddNumbers));
