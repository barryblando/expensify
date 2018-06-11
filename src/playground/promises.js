// </reference https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

const posts = [
  { title: 'I love Javascript', author: 'Wes Bos', id: 1 },
  { title: 'CSS!', author: 'Barry Blando', id: 2 },
  { title: 'Dev tools tricks', author: 'Addy Osmani', id: 3 },
];

const authors = [
  { name: 'Wes Bos', twitter: '@wesbos', bio: 'Canadian Developer' },
  { name: 'Barry Blando', twitter: '@Retr0_0x315', bio: 'Filipino Developer' },
  { name: 'Addy Osmani', twitter: '@addyosmani', bio: 'Googler' },
];

function getPostById(id) {
  // create new promise
  return new Promise((resolve, reject) => {
    // using a set timeout(arbitrary delay) to mimic a database
    setTimeout(() => {
      // find  the post we want
      const pst = posts.find(post => post.id === id);
      if (pst) {
        resolve(pst); // send the post back
      } else {
        reject(Error('No post was found!'));
      }
    }, 1000);
  });
}

// going to take in the Post
function hydrateAuthor(post) {
  // create new promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // find the author
      const authorDetails = authors.find(person => person.name === post.author);
      if (authorDetails) {
        // "hydrate" the post object with the author object
        post.author = authorDetails;
        resolve(post); // send the post back
      } else {
        reject(Error("Can't find the author."));
      }
    }, 2000);
  });
}

getPostById(2)
  .then(post => {
    // once resolved, call hydrateAuthor and pass the post
    console.log(post);
    // this function is going to return a Promise itself
    return hydrateAuthor(post);
    // once resolved gonna fire the callback from next .then which is to log the hydrated object
  })
  .then(post => {
    // this callback will only fire once promise is resolved otherwise rejected then catch error
    console.log(post); // log hydrated object
  })
  .catch(err => {
    console.log(err);
  });
