// code away!
//Don't need to import express because it's already running on the server


//importing the server from /server file
const server = require('./server');

// const postRouter = require('./posts/postRouter')

// server.use('/posts')

const port = 8000

//Telling the server to listen to this port
server.listen(port, () => console.log (`api on port ${8000}`))


