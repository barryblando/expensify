const person = {
  name: 'Barry',
  age: 24,
  location: {
    city: 'Davao',
    temp: 37,
  },
  expenses: [
    {
      id: '#01233',
      description: 'January Rent',
      note: 'This  was the final payment for January',
      amount: 54500,
    },
    {
      id: '#01234',
      description: 'February Rent',
      note: 'This  was the final payment for February',
      amount: 54400,
    },
  ],
};

// destructuring Syntax for Object { }, it's valid if its names are unordered as long as it matches the object keys

const { location, name, age, expenses } = person;
const { city, temp } = location;
const [janRent, febRent] = [expenses[0].amount, expenses[1].amount];

console.log(expenses.filter(({ id }) => id !== '#01234'));

console.log(`January Rent: ${janRent}, February Rent: ${febRent}`);
console.log(`${name} : ${age}`);
console.log(`It's ${temp}c in ${city}`);

// destructuring w/ undefined value in object literal
const settings = {
  width: 300,
  color: 'black',
};
// assigning fallback / default values
const { width, height = 100, color, fontSize = 25 } = settings;

// Object destructuring w/ variable renaming (:) & default values (i.e ReactJS)
const { width: w = 400, height: h = 500 } = { width: 800 };

console.log(`Width: ${w}`);

// destructuring Syntax for Array [ ], it's valid if it has no name or ignored as long as it it matches the order of the array

const address = ['Lubak Street', 'Davao', 'PH', '8000'];
const [, cty, state] = address;

console.log(`You are in ${cty} city, ${state}`);

// destructuring function parameters
const add = ({ a, b }, c) => a + b + c;

console.log(add({ a: 1, b: 12 }, 100));

function removeExpense(data) {
  console.log(data);
  function expense({ id } = {}) {
    console.log(id);
  }
  expense(data);
}

removeExpense({ id: '12323' });
