// Catching Async Await Error using Error Handler Factory (High Order Function) DRY code
// </reference https://codeburst.io/async-await-saves-the-day-sort-of-738e6b1cde64
// </reference https://medium.com/mofed/javascripts-recursive-closure-and-curry-functions-3c44e1b73158\
// </reference https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36
// </reference https://javascript.info/currying-partials
// </reference https://community.risingstack.com/explaining-javascript-closure-scope-chain-examples/

function breathe(amount) {
  return new Promise((resolve, reject) => {
    if (amount < 500) {
      reject(Error('Ohh Noo! Too Low!'));
    }
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  });
}

function catchErrors(fn) {
  /** CLOSURE * */
  // using rest to capture all the parameters into an array
  return function(...params) {
    // using spread to all those parameters immediately back into the function
    return fn(...params).catch(err => {
      // go returns promise so you can always just tack on a .catch on the end
      console.error('Ohh Nooo!!!!');
      console.error(err);
    });
  };
}

async function go(name, last) {
  console.log(`Starting for ${name} ${last}!!!`);
  const res = await breathe(1000);
  console.log(res);
  const res2 = await breathe(300);
  console.log(res2);
  const res3 = await breathe(750);
  console.log(res3);
  const res4 = await breathe(900);
  console.log(res4);
}

/** CURRYING * */
const wrappedFunction = catchErrors(go);
wrappedFunction('Barry', 'Blando');
