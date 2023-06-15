const express = require('express');
const userModel = require("../scehma/questionScehma");
// Initialize app
const router = express.Router();
// router.get('/questions', function (req, res) {
//     console.log('req',req);
//     res.send('home testing');
// });
router.get("/Question", async (request, response) => {
   // const users = await userModel.find({});
  
    try {
      response.send("hello world");
    } catch (error) {
      response.status(500).send(error);
    }
  });
 module.exports = router;
//var routerExport = (module.exports = mongoose.router('question',router))
