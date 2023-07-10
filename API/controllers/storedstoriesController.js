const storyModel = require('../models/storyModel')
const storedStoryModel = require('../models/storedStoryModel')
var mongoose = require('mongoose')
const { Configuration, OpenAIApi } = require('openai')
const questionModel = require('../models/questionModel')
const configuration = new Configuration({
  organization: 'org-x9rhY4f5E0Ro934IfxRPhqn7',
  apiKey: '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'
})
const Freemarker = require('freemarker')
exports.index = function (req, res) {
  storedStoryModel.find().then(data => {
    res.send({ data: data })
  })
}

exports.generateAdmin = async (req, res) => {
  let risksArray = []
  let klpArray = []
  let klps = ''
  let risks = ''
  let questions = await questionModel.findOne({ index: req.body.index })
  let promptTemplate = questions.template
  let inputs = {}
  for (let i = 0; i < req.body.questions.length; i++) {
    let questionIndex = req.body.questions[i].index
    let answeredOptionId = req.body.questions[i].id
    let selectedQuestion = questions.questions.filter(
      item => item.index === questionIndex
    )
    let selectedOption = selectedQuestion[0].optionList.filter(
      o => o.id === parseInt(answeredOptionId)
    )
    if (selectedOption && selectedOption[0].risk) {
      for (let j = 0; j < selectedOption[0].risk.length; j++) {
        risksArray.push(selectedOption[0].risk[j])
      }
    }
    if (selectedOption && selectedOption[0].klp) {
      for (let j = 0; j < selectedOption[0].klp.length; j++) {
        klpArray.push(selectedOption[0].klp[j])
      }
    }
    if (selectedQuestion[0].template_key) {
      inputs[selectedQuestion[0].template_key] = req.body.questions[i].answer
    }
  }

  risksArray = removeDuplicates(risksArray)
  klpArray = removeDuplicates(klpArray)

  for (let i = 0; i < risksArray.length; i++) {
    risks += risksArray[i] + ', '
  }

  for (let i = 0; i < klpArray.length; i++) {
    klps += klpArray[i] + ', '
  }

  inputs['klps'] = klps
  inputs['risks'] = risks
  const freemarker = new Freemarker()
  freemarker.render(promptTemplate, inputs, (err, result) => {
    // if (err) {
    //   throw new Error(err)
    // }
    // console.log(result)
    let identifierStr = ''
    for (let i = 0; i < req.body.questions.length; i++) {
      identifierStr += '-' + req.body.questions[i].id
    }
    try {
      let output = callChatGPT(result)
      output.then(function (result1) {
        let ssm = new storedStoryModel()
        ssm.category = req.body.index
        ssm.identifier = identifierStr
        ssm.story = result1.choices[0].text
        ssm.prompt = result
        ssm.klp = klpArray
        ssm.risk = risksArray
        ssm.verified = false
        ssm.save()
        res.send({
          id: ssm._id,
          story: result1.choices[0].text,
          prompt: result,
          klp: klpArray,
          risk: risksArray,
          verified: false
        })
      })
    } catch (e) {
      res.send({
        message: e
      })
    }
  })
}

async function callChatGPT (promptText) {
  const openai = new OpenAIApi(configuration)
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptText,
    max_tokens: 1000,
    temperature: 0
  })
  console.log(response.data)
  return response.data
}

function removeDuplicates (arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}

exports.updateStroyAdmin = async function (req, res) {
  try {
    let id = new mongoose.Types.ObjectId(req.body.id)
    let story = req.body.story
    let update = await storedStoryModel.findByIdAndUpdate(id, {
      story: story,
      verified: true
    })
    res.send({
      id: update._id
    })
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}

exports.deleteStroyAdmin = async function (req, res) {
  try {
    let id = new mongoose.Types.ObjectId(req.body.id)
    await storedStoryModel.findOneAndRemove(id)
    res.send()
  } catch (e) {
    res.status(400).send({ message: e.message })
  }
}
