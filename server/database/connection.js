//connection.js in database/connection.js
const mongoose = require("mongoose");
const connection = "mongodb://192.168.178.60:27017/segaho";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
//mongoose.set('useFindAndModify', false);

// connect function that actually create a connection to the database
const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;