var mongoose = require('mongoose')

var storySchema = mongoose.Schema({
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

var Stories = (module.exports = mongoose.model('stories', storySchema))
