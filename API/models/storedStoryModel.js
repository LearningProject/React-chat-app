var mongoose = require('mongoose')

var storedStorySchema = mongoose.Schema({
  category: {
    type: 'number'
  },
  identifier: {
    type: 'String'
  },
  story: {
    type: 'String'
  },
  prompt: {
    type: 'String'
  },
  klp: {
    type: ['String']
  },
  risk: {
    type: ['String']
  },
  verified: {
    type: 'Boolean'
  }
})

var storedStory = (module.exports = mongoose.model(
  'storedstory',
  storedStorySchema
))
