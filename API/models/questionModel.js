var mongoose = require('mongoose')

var questionSchema = mongoose.Schema({
  index: {
    type: 'Number'
  },
  type: {
    type: 'String'
  },
  questions: {
    type: ['Mixed']
  },
  template: {
    type: 'String'
  }
})

var Question = (module.exports = mongoose.model('questions', questionSchema))
