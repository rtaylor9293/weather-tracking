const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');
const authController = require("./controllers/auth");
const weatherController = require("./controllers/weather");
const app = express();

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// helps
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(session({
  secret: "spen101721",
  resave: false,
  saveUninitialized: false,
}));
app.use(passUserToView);
// Routes
app.get("/", (req, res) => {
  res.redirect("/weather");
});
app.use("/auth", authController);      
app.use("/weather", isSignedIn, weatherController); 

app.get('/users/weather', (req, res) => {
    res.redirect('/weather');
});

app.use('/', weatherController);

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});