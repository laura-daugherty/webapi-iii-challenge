const express = 'express';

const router = express.Router();

router.post('/', (req, res) => {
  //insert(): calling insert passing it a resource object will add it to the database and return the new resource.
  //adding a new user to the DB
});

router.post('/:id/posts', (req, res) => {
  //adding a new post to the user with the ID
  //insert()

});

router.get('/', (req, res) => {
  //get all the users
  //get(): calling find returns a promise that resolves to an array of all the resources contained in the database.
});

router.get('/:id', (req, res) => {
  //get the user of the specified ID

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {
  
//remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
});

router.put('/:id', (req, res) => {
  //update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
