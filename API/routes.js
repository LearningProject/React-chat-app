//routes.js
//initialize express router

let router = require('express').Router();
const questionController = require('./controllers/questionController');
const storedstoriesController = require('./controllers/storedstoriesController');
const dashboardController = require('./controllers/dashboardController');
const ctrlAuth = require('./controllers/authenication');
const { expressjwt: jwt } = require('express-jwt');

//set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Works',
    message: 'Welcome to FirstRest API'
  })
})


const auth = jwt({
  secret: "shhhhhhared-secret",
  userProperty: 'payload',
  algorithms: ['sha1', 'RS256', 'HS256']
});

router.post('/login', ctrlAuth.login)
router.post('/register', ctrlAuth.register)
// router.route('/questions').get(questionController.index)
// router.route('/generate').post(questionController.generate)
// router.route('/fetch').post(questionController.fetch)

//router.get('/admin/questions', auth, questionController.index)
router.get('/admin/stories', auth, storedstoriesController.index)
router.post('/admin/generateStory', auth, storedstoriesController.generateAdmin)
router.post('/admin/updateStory', auth, storedstoriesController.updateStroyAdmin)
//router.post('/admin/questions', auth, questionController.create)
router.get('/admin/dashboard', auth, dashboardController.index)
//router.post('/admin/updateCategory', auth, questionController.updateCategory)
//router.delete('/admin/questions', auth, questionController.delete)
//router.patch('/admin/questions', auth, questionController.update)
router.post('/admin/deleteStory', auth, storedstoriesController.deleteStroyAdmin)
//Export API routes
module.exports = router
