const express = require('express')
const server = express()
const PostsRoute = require('./posts/PostRoutes')

server.use(express.json())
server.use('/api/posts', PostsRoute)

server.get('/', (req, res) => {
    res.send(`
      <h2>Posts API</h2>
    `);
  });
  

const port = 7777
server.listen(port, () => console.log(`\nrunning on http://localhost:${port}\n`))