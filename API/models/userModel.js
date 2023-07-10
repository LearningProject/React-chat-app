const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email })
        if (user) {
          return false
        } else {
          return true
        }
      },
      message: props => 'The email is already in use.'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  hash: String,
  salt: String
})

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex')
}

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex')
  return this.hash === hash
}

userSchema.methods.generateJwt = function () {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000)
    },
    process.env.SECRET_KEY
  ) // DO NOT KEEP YOUR SECRET IN THE CODE!
}

var User = (module.exports = mongoose.model('User', userSchema))
