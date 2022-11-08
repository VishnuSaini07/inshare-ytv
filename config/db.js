require('dotenv').config()
const mongoose = require('mongoose')

function connectDB() {
    // Database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
    const connection = mongoose.connection;

    connection.once('open', function () {
        console.log('Database Connected');
      })
      .on('error', function (err) {
        console.log(err);
      });
}

module.exports = connectDB