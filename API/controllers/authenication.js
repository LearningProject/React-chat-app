const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/userModel')

module.exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err);
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err)
      return
    }
    // If a user is found
    if (user) {
      const token = user.generateJwt()
      res.status(200)
      res.json({
        token: token
      })
    } else {
      // If user is not found
      res.status(401).json(info)
    }
  })(req, res, next)
}

module.exports.register = async (req, res, next) => {
  const user = new User()
  user.name = req.body.name
  user.email = req.body.email
  user.setPassword(req.body.password)

  try {
    let resjson = await user.save()
    const token = user.generateJwt()
    res.status(200)
    res.json({
      token: token
    })
  } catch (e) {
    console.log(e)
    res.status(400)
    res.json({
      message: e.message
    })
  }
}
