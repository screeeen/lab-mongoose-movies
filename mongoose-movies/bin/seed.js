// bin/seed.js
const mongoose = require('mongoose');
// const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');
const dbName = 'celebrities';
mongoose.connect(`mongodb://localhost/${dbName}`);




const movies = [
  {
  title: "Lost Worlds",
  genre:"sci fi",
  plot: "Two people get lost in the ass of the world"
},
{
  title: "Jurassic Trap",
  genre:"Action",
  plot: "A bunch of explorers die because a dinosaur farts too big"
},
{
  title: "Hey! what's morgan?",
  genre:"comedy",
  plot: "Computer Scientists don't knwo wtf is morgan"
}

]

Movie.create(movies, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${movies.length} movies`)
  mongoose.connection.close();
});



// const celebrities = [
//   {
//   name: "mickie",
//   occupation:"mouse",
//   catchPhrase: "hey, minie"
// },
// {
//   name: "donald",
//   occupation:"duck",
//   catchPhrase: "cuak cuak"
// },
// {
//   name: "goofy",
//   occupation:"dog",
//   catchPhrase: "whof whof"
// }

// ]

// Celebrity.create(celebrities, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${celebrities.length} celebrities`)
//   mongoose.connection.close();
// });