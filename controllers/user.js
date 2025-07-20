const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/communityWeather', async (req, res) => {
    const usersInDatabase = await User.find({}).sort({ username: 1 })
    console.log(usersInDatabase)

    res.render('users/index.ejs', {
        users: usersInDatabase,
    })
})

router.get('/communityWeather/:userId', async (req, res) => {
    const foundUser = await User.findById(req.params.userId)
    
    console.log('foundUser:', foundUser)
    
    res.render('users/show.ejs', {
        users: foundUser,
        weatherSchema: foundUser.weather,
    })
})

router.get('/communityWeather/:userId/:itemId', async (req, res) => {
    const foundUser = await User.findById(req.params.userId)
    const index = foundUser.weather.filter(item => {
        // console.log({item: item._id.toString()})
        return item._id.toString() === req.params.itemId
    })

    // console.log({index, params:req.params})
    res.render('weather/communityWeather.ejs', {
        users: foundUser,
        weather: index,
    })
})

module.exports = router;