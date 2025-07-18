
const mongoose = require("mongoose");
const weatherSchema = new mongoose.Schema({
  type: String,
  notes: String,
  fahrenheit: Number,
  state: String,
  user: {type : mongoose.Schema.Types.ObjectId, ref: 'user'},
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("weather", weatherSchema);


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

    weatherSchema: [weatherSchema],

});

const User  = mongoose.model("User", userSchema)

module.exports = User
