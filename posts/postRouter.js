
const router = require('express').Router();
const Posts = require('./postDb')

router.use(validatePostId)

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
    return
  } if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
    return
  } else {
    next()
  }
};

module.exports = router;