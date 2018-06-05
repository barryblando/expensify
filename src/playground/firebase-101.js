import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB23tI5T6eZVDe7yU8uVUPvmj7h-JVYPCo',
  authDomain: 'expensify-1195c.firebaseapp.com',
  databaseURL: 'https://expensify-1195c.firebaseio.com',
  projectId: 'expensify-1195c',
  storageBucket: 'expensify-1195c.appspot.com',
  messagingSenderId: '697096536530',
};

firebase.initializeApp(config);

const database = firebase.database();

// set - to set value to specific reference
// ref - to pick which part of the database trying to change

// ----------------------------------------
//  SETTING INITIAL DATA
// ----------------------------------------

// database
//   .ref()
//   .set({
//     name: 'Alyssa Alyssa',
//     age: 23,
//     isSingle: true,
//     stressLevel: 6,
//     job: {
//       title: 'Software Developer',
//       company: 'Google',
//     },
//     location: {
//       city: 'CEBU',
//       country: 'Philippines',
//     },
//   })
//   .then(() => {
//     console.log('Data is saved!');
//   })
//   .catch(err => console.log(err));

// ----------------------------------------
//  CHANGING DATA
// ----------------------------------------

// database.ref('age').set(25);
// database.ref('location/city').set('MNL');

// ----------------------------------------
//  ADDING DATA
// ----------------------------------------

// database.ref('attributes').set({
//   height: 164,
//   weight: 63,
// });

// ----------------------------------------
//  REMOVING DATA
// ----------------------------------------

// passing null for the new value is equivalent to calling remove(), but remove() is more explicit
// database.ref('isSingle').set(null);

// database
//   .ref('isSingle')
//   .remove()
//   .then(() => console.log('Data was removed'))
//   .catch(e => console.log(e));

// ----------------------------------------
//  UPDATING DATA
// ----------------------------------------

// update has be called with an object
// database.ref().update({
//   name: 'Alyssa', // update
//   age: 23, // update
//   job: 'Software Developer', // add
//   isSingle: null, // remove
// });

// update specific object data child using '/'
// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'DAVAO',
// });

// ----------------------------------------
//  FETCHING DATA
// ----------------------------------------

// 'once' = listens for exactly one event of the specified event type, and then stops listening.
// event = 'value'
// database
//   .ref()
//   .once('value')
//   .then(snapshot => {
//     const val = snapshot.val(); // store value
//     console.log(val);
//   })
//   .catch(e => console.log('Error fetching data', e));

// 'on' = listen/subscribe to database changes over and over again
// 'on' doesn't pass promises, so gonna pass success/resolve handler as second argument
// const onValueChange = database.ref().on(
//   'value',
//   snapshot => {
//     console.log(snapshot.val());
//   },
//   e => console.log('Error with data fetching', e)
// );

// delay 3.5s
// setTimeout(() => {
//   database.ref('age').set(29);
// }, 3500);

// setTimeout(() => {
//   database.ref().off('value', onValueChange); // cancel subscription & succeeding subscription
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(24);
// }, 8500);

// turn back on subscription
// setTimeout(() => {
//   database.ref().on('value', snapshot => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//   });
// }, 10500);

const notes = [
  {
    id: '12',
    title: 'First Note',
    body: 'This is my note',
  },
];

// ------------------------------------------
// PUSHING AN ARRAY DATA
// Firebase doesn't accept array, use push
// push automatically generates id
// ------------------------------------------

// database.ref('notes').push({
//   title: 'First Note',
//   body: 'This is my note',
// });

// database.ref('notes').push({
//   title: 'Another note',
//   body: 'This is my note',
// });

// Access & update data using id
// database.ref('notes/-LEEDBVJTilbp24782wM').update({
//   body: 'Buy food',
// });

// database.ref('notes/-LEEDBVJTilbp24782wM').remove();

// database.ref('expenses').push({
//   description: 'Rent',
//   note: 'Car Rental',
//   amount: 1950,
//   createdAt: 0,
// });

// database.ref('expenses').push({
//   description: 'Water Bill',
//   note: '',
//   amount: 19520,
//   createdAt: 990012322,
// });

// database.ref('expenses').push({
//   description: 'Electricity Bill',
//   note: 'Tesla Usage',
//   amount: 1950,
//   createdAt: 0,
// });

// ------------------------------------------
// FETCHING EXPENSES
// ------------------------------------------
// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expenses = [];
//     // </reference https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#forEach
//     // enumerating, creating & pushing new object into expenses array
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key, // store the generated id by firebase to new id
//         ...childSnapshot.val(), // spread out remaining value
//       });
//     });

//     console.log(expenses);
//   })
//   .catch(e => console.log(e));

// ------------------------------------------
// FETCHING EXPENSES (SUBSCRIBE MODE)
// ------------------------------------------

// 'on' = listen/subscribe to database changes over and over again
// 'on' doesn't pass promises, so gonna pass success/resolve handler as second argument
// database.ref('expenses').on(
//   'value',
//   snapshot => {
//     const expenses = [];
//     </reference https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#forEach
//     enumerating, creating & pushing new object into expenses array
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key, // store the generated id by firebase to new id
//         ...childSnapshot.val(), // spread out remaining value
//       });
//     });

//     console.log(expenses);
//   },
//   e => console.log('Error with data fetching.', e)
// );

// child_removed - fires when one of the child gets deleted i.e in expenses
database.ref('expenses').on(
  'child_removed',
  snapshot => {
    console.log(snapshot.key, snapshot.val());
  },
  e => console.log(e)
);

// child_changed - fires when children changes
database.ref('expenses').on(
  'child_changed',
  snapshot => {
    console.log(snapshot.key, snapshot.val());
  },
  e => console.log(e)
);

// child_added - fires when a child added i.e new expense
// it doesn't just gets called for new children, it also gets called for the existing one
database.ref('expenses').on(
  'child_added',
  snapshot => {
    console.log(snapshot.key, snapshot.val());
  },
  e => console.log(e)
);

database.ref('expenses').push({
  description: 'Internet Bill',
  note: 'PLDT FIBR',
  amount: 1950,
  createdAt: 0,
});
