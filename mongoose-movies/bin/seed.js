// bin/seed.js
const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

const dbName = 'celebrities';
mongoose.connect(`mongodb://localhost/${dbName}`);



const celebrities = [
  {
  name: "mickie",
  occupation:"mouse",
  catchPhrase: "hey, minie"
},
{
  name: "donald",
  occupation:"duck",
  catchPhrase: "cuak cuak"
},
{
  name: "goofy",
  occupation:"dog",
  catchPhrase: "whof whof"
}

]

Celebrity.create(celebrities, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebrities`)
  mongoose.connection.close();
});