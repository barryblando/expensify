const names = ['Barry', 'Klara'];

// when doing state array use concat over push, cause push changes the original state array rather than creating a new array

names.push('Jan');

console.log(names);

console.log(names.concat('July'));

console.log(names);