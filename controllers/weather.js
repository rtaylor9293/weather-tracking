


const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

/*
Action	Route	HTTP Verb
Index	‘/users/:userId/foods’	GET
New	‘/users/:userId/foods/new’	GET
Create	‘/users/:userId/foods’	POST
Show	‘/users/:userId/foods/:itemId’	GET
Edit	‘/users/:userId/foods/:itemId/edit’	GET
Update	‘/users/:userId/foods/:itemId’	PUT
Delete	‘/users/:userId/foods/:itemId’	DELETE
*/

// All routes below are mounted on /users/:userId/foods

// INDEX
router.get('/', async (req, res) => {
        const userEntries = await User.findById(req.session.user._id)
        console.log(userEntries.weather)
        const weatherEntries = userEntries.weather
        res.render('weather/index.ejs', {
            weatherEntries: userEntries.weather,
        });
});

// NEW
router.get('/new', (req, res) => {
    res.render('weather/new.ejs');
})

// DELETE
router.delete('/:itemId', async (req, res) => {
    try {
        console.log(req.session.user);
         console.log(req.params.itemId);
        const currentUser = await User.findById(req.session.user._id);
        const currentWeather = currentUser.weather.id(req.params.itemId).deleteOne();
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/weather`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// UPDATE
router.put('/:itemId', async (req, res) => {
    try {
        console.log(req.session.user);
         console.log(req.params.itemId);
        const currentUser = await User.findById(req.session.user._id)
        const currentWeather = currentUser.weather.id(req.params.itemId)

        currentWeather.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/weather/${currentWeather._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
router.get('/new', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('weather/new', { user: currentUser });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


// CREATE
router.post('/', async (req, res) => {
  try {
    console.log(req.session.user);
    const currentUser = await User.findById(req.session.user._id);
    console.log(req.body);
    const newWeather = {
      fahrenheit: req.body.fahrenheit,
      state: req.body.state,
      notes: req.body.notes,
      type: req.body.type
   
    };
    console.log(currentUser);
    currentUser.weather.push(newWeather);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/weather`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
// EDIT
router.get('/:itemId/edit', async (req, res) => {
    try {
        console.log(req.session.user);
        console.log(req.params.itemId);
        const currentUser = await User.findById(req.session.user._id);
        const currentWeather = currentUser.weather.id(req.params.itemId)
        res.render('weather/edit.ejs', {
            weather: currentWeather,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// SHOW
router.get('/:itemId', async (req, res) => {
    try {
        console.log(req.session.userId);
        console.log(req.params.itemId);
        const currentUser = await User.findById(req.session.user._id)
        const currentWeather = currentUser.weather.id(req.params.itemId)
        res.render('weather/show.ejs', {
            weather: currentWeather,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router;