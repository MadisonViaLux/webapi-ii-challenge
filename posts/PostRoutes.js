const express = require('express')
const Post = require('../data/db')
const router = express.Router()


router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch( err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})



router.get('/:id', (req, res) => {
    const { id } = req.params

    Post.findById(id)
        .then(post => {
            if(!id){
                res.status(404).json({ error: '404' })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})



router.get('/:id/comments', (req, res) => {
    const { id } = req.params

    Post.findPostComments(id)
        .then(comments => {
            if(!id){
                res.status(404).json({ error: '404' })
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'no comment post found' })
        })
})



router.post('/', (req, res) => {
    const newPost = req.body

    if(!newPost.title && !newPost.contents){
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Post.insert(newPost)
            .then(newPosts => {
                res.status(201).json(newPosts)
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})



router.post('/:id/comments', (req, res) => {
    const { id } = req.params
    const comment = req.body

    // console.log(comment)

    if(!id){
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if(!comment.text){
            return res.status(400).json({ errorMessage: "Please provide text for the comment." })
        } else {
            Post.insertComment(comment)
                .then(addComments => {
                    res.status(200).json(addComments)
                })
                .catch(error => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
        }
    }
)



router.delete('/:id', (req, res) => {
    const { id } = req.params

    Post.remove(id)
        .then(post => {
            if(!id){
                return console.log(res.status(404).json({ message: "The post with the specified ID does not exist." }))
            } else {
                return console.log(res.status(200).json(post))
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})



router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    if(!id){
        return console.log(res.status(404).json({ message: "The post with the specified ID does not exist." }))
    } else if(!changes.title && !changes.contents){
        return console.log(res.status(400).json({ errorMessage: "Please provide title and contents for the post." }))
    } else {
        Post.update(id, changes)
            .then(update => res.status(200).json(update))
            .catch( error => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
}) 



module.exports = router