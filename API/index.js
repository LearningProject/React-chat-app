const { MongoClient } = require('mongodb')
const posts = require('./routes/questions');
// Load express module
const express = require('express');

// Initialize app
const app = express();
const router = express.Router();

// Create Instance of MongoClient for mongodb
const client = new MongoClient('mongodb://0.0.0.0:27017/risk_playground/questions')

// Connect to database
client.connect()
    .then(() => console.log('Connected Successfully'))
    .catch(error => console.log('Failed to connect', error))

    // Route for home
app.get('/', function (req, res) {
    res.send('hello world')
});


app.get('/questions', function (req, res) {
    console.log('req',req);
    res.send('home testing');
});
// router.get("/q", async (request, response) => {
//    // const users = await userModel.find({});
//     try {
//       response.send("hello world");
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });

// Start server with port 3000
app.listen(3000, function(){
    console.log("Server started on localhost:3000");
});
