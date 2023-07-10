var mongoose = require('mongoose')
const storedStoryModel = require('../models/storedStoryModel')
const questionModel = require('../models/questionModel')
const Freemarker = require('freemarker')

exports.index = async (req, res) => {
  let totalStories = await storedStoryModel.count()
  let totalVerifiedStories = await storedStoryModel
    .find({ verified: true })
    .count()
  let totalNonVerifiedStories = await storedStoryModel
    .find({ verified: false })
    .count()
  let totalCategories = await questionModel.find().count()
  res.send({
    totalCategories: totalCategories,
    totalStories: totalStories,
    totalVerifiedStories: totalVerifiedStories,
    totalNonVerifiedStories: totalNonVerifiedStories
  })
}
