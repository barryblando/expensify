/* eslint-disable */
const dragons = ['cool dragon', 'angry dragon', 'nasty dragon'];

const iterator = dragons[Symbol.iterator]();
iterator.next() //?
iterator.next() //?
iterator.next() //?
iterator.next() //?

for (const dragon of dragons) {
  dragon
}

const fibonacciRecursion = function (num) {
  if (num <= 1) return 1;
  return fibonacciRecursion(num -1) + fibonacciRecursion(num -2);
}

fibonacciRecursion(20); /*?.*/

// ------------------------------------------------------------------------------------
// </reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

const randomNumber =
  require('random-number');

function randomItem(array) {
  const randomIndex = randomNumber({
    min: 0,
    max: array.length -1,
    integer: true
  });
  return array[randomIndex];
}

const makeDragon = () => {
  const dragonSizes = ['big', 'medium', 'tiny'];
  const dragonAbilities = ['fire', 'water', 'lightning']
  return `${randomItem(dragonSizes)} ${randomItem(dragonAbilities)} dragon`;
}

const dragonArmy = {
  [Symbol.iterator]: () => {
    return {
      next: () => {
        const enoughDragonsSpawned = Math.random() > 0.75;
        enoughDragonsSpawned //?
        if (!enoughDragonsSpawned)
          return {
            value: makeDragon(),
            done: false
          } //?
        return { done: true } //?
      } //?
    }
  }
} //?

for (const dragon of  dragonArmy) {
  dragon //?
}
