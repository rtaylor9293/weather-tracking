
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/', (req, res) => {
  res.send('');
});




router.get('/', async (req, res) => {
  try {
    res.render('weather/index.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById
    res.render('weather/index.ejs', {
      weather : currentUser.weather, }); 
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/new', async (req, res) => {
  res.render('weather/new.ejs');
});



router.post('/', async (req, res) => {
  try {
    console.log('sanity check', req.session.user._id);
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.weatherSchema.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/weather/users/weather`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

router.get("/users/weather", async (req, res) => {
  console.log(req.session.user);
  const userEntries = await User.findById(req.session.user._id);
  console.log(userEntries.weatherSchema)
  const weatherEntries = userEntries.weatherSchema
  res.render('weather/index.ejs', {
    weatherEntries: userEntries.weatherSchema,
    
 });
});





// controllers/applications.js`

router.put('/:weatherId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current application from the id supplied by req.params
    const weather = currentUser.weatherSchema.id(req.params.weatherId);
    // Use the Mongoose .set() method
    // this method updates the current application to reflect the new form
    // data on `req.body`
    weather.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current application
    res.redirect(
      `/weather`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/weatherId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.weatherSchema.id(req.params.weatherId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/weather`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});



// controllers/applications.js

router.get('/:weatherId', async (req, res) => {
  try {
    console.log(req.session.user);
    const currentUser = await User.findById(req.session.user._id);
    const weather = currentUser.weatherSchema.id(req.params.weatherId);
    console.log(weather);
    res.render('weather/show.ejs', {
      
      weather: weather
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.post("/", async (req, res) => {
  const weatherData = {
    ...req.body,
    user: req.session.userId 
  };
  await weather.create(weatherData);
  res.redirect("/weather");
});

module.exports = router;
