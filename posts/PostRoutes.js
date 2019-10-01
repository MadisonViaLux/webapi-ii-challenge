const express = require('express')

const Db = require('../data/db')

const postRoutes = express.Router()




postRoutes.get('/api/posts/', (req, res) => {
    Db.find()
        .then(db => {
            res.status(200).json(db)
        })
        .catch( res.status(500).json( { error: 'lol no' } ) )
})



postRoutes.get('/api/posts/:id/comments', (req, res) => {
    Db.findPostComments(req.params.id)
    .then(comments => {
        if(comments.length > 0){
            res.status(200).json(comments)
        } else {
            res.status(404).json({ error: '404'})
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'no comment post found' })
    })
})



postRoutes.get('/api/posts/:id', (req, res) => {
    Db.findById(req.params.id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch( error => {
            res.status(500).json({ error: "id does not exist" })
        })
})



postRoutes.post('/api/posts/:id/comments', (req, res) => {

    req.body.post_id = req.params.id;

    if(!req.body.text){
       return res.status(400).json({error: 'bad request'})
    }
    Db.insertComment(req.body)
    .then(addComments => {
            res.status(200).json(addComments)
    })
    .catch(error => {
        res.status(500).json({ error: 'no comment added' })
    })
})



postRoutes.post('/api/posts', (req, res) => {
    if(!req.body.title || !req.body.content){
        return res.status(400).json({error: 'no title or content'})
     }
    Db.insert(req.body)
    .then(postId => {
            res.status(200).json(postId)
    })
    .catch(error => {
        res.status(500).json({ error: 'no post ID' })
    })

})



postRoutes.delete('/api/posts/:id', (req, res) => {

    const newData = []

    Db.findById(req.params.id)
        .then((data) => {
            if(data[0]){
                newData.push(data)
            } else {
               return res.status(404).json({ error: '404'})
            }
            
        })
        .catch( error => {
           return res.status(500).json({ error: "id does not exist" })
        })

    Db.remove(req.params.id)
    .then((rmData) => {
            res.status(200).json(newData)
    })
    .catch(error => {
        res.status(500).json({ error: 'this post could not be deleted' })
    })
})


module.exports = postRoutes