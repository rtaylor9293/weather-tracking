const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');
const authController = require("./controllers/auth.js");
const weatherController = require("./controllers/weather.js");
const usersController = require('./controllers/user.js');
const app = express();

const port = process.env.PORT ? process.env.PORT : '3500';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// server.js



app.get('/', (req, res) => { 
  console.log(req.session.user)
  if (req.session.user) {
    res.redirect("/users/<%= user._id %>/weather")
  } else {
res.render('index.ejs', {
    user: req.session.user,
  });
  }
});


app.use(express.static('public'));
app.use(passUserToView); // use new passUserToView middleware here
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/weather', weatherController);
app.use(usersController);
app.listen(port, () => {
  console.log('sanity check');
});