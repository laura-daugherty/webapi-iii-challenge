const express = require('express');
const router = require('./users/userRouter');

const server = express();

//NEED TO TELL SERVER TO READ JSON
server.use(express.json())


//telling us what middleware we're using in what order
// server.use(logger)
server.use(router)

//initial get request to start server
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


//custom Global middleware
function logger(req, res, next) {
  res.status(200).json({ message: 'Im logging you'}),
  console.log(req.method),
  console.log(req.url),
  console.log(`${new Date().toISOString()}`),
  next()
};

//exporting as server
module.exports = server;

