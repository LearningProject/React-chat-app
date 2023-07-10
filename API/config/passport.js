const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = mongoose.model('User')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async function (username, password, done) {
      try {
        let userObj = await User.findOne({ email: username })
        if (!userObj) {
          return done(null, false, {
            message: 'User not found'
          })
        }
        if (!userObj.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          })
        }
        return done(null, userObj)
      } catch (e) {
        return done(err)
      }
    }
  )
)
