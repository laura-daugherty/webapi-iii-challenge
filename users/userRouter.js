const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb')
const router = express.Router();

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  userDb.getById(id)
  .then( user => {
    if (user) {
      req.user = user
      return next()
    } else {
      return res.status(404).json({message: "invalid user id"})
    }

  })
  .catch(error => {
    res.status(500).json({message: "database error" })
  })
};

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  console.log(body)
  if (!body) {
    res.status(400).json({message: "missing user data"})
  } else if (!name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }
};

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  console.log(body)
  if (!body) {
    res.status(400).json({message: "missing post data"})
  } else if (!text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
};

router.post('/api/users', validateUser, (req, res) => {
  //insert(): calling insert passing it a resource object will add it to the database and return the new resource.
  //adding a new user to the DB
  userDb.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({error: "error creating user"})
  })
});

router.post('/api/users/:id/posts', validatePost, validateUserId, (req, res) => {
  //adding a new post to the user with the ID
  //insert()
  req.body.user_id = req.params.id
  postDb.insert(req.body)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    res.status(500).json({error: "error making post"})
  })
});

router.get('/api/users', (req, res) => {
  //get all the users
  //get(): calling find returns a promise that resolves to an array of all the resources contained in the database.
  userDb.get()
  .then(user => {
    console.log(user)
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "cannot get users"})
  })
});

router.get('/api/users/:id', validateUserId, (req, res) => {
  //get the user of the specified ID
  res.status(200).json(req.user)
});

router.get('/api/users/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  userDb.getUserPosts(id)
  .then(posts => {
    res.status(200).json({posts})
  })
  .catch(error => {
    res.status(500).json({message: "error fetching posts"})
  })
});

router.delete('/api/users/:id', validateUserId, (req, res) => {
  const { id } = req.params
  userDb.remove(id)
  .then(user => {
    res.status(200).json({user})
  })
  .catch(error => {
    res.status(500).json({message: "problem deleting"})
  })
//remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
});

router.put('/api/users/:id', validateUser, validateUserId, (req, res) => {
  const {id} = req.params
  const update = req.body
  userDb.update(id, update)
  .then(update => {
    res.status(200).json({update})
  })
  .catch(error => {
    res.status(500).json({message: "did not update"})
  })
  //update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
});



module.exports = router;
