
const mongoose = require("mongoose");
const weatherSchema = new mongoose.Schema({
  fahrenheit: Number,
  state: String, 
  notes: String,
  type: {
    type: String, 
    enum: ['sunny', 'rain', 'neutral', 'windy']
  }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    weather: [weatherSchema],

});

const User  = mongoose.model('User', userSchema)

module.exports = User;
