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
    const comment = req.body

    if(comment.post_id = req.params.id){
        if(!comment.text){
            return res.status(400).json({error: 'bad request'})
        } else {
            Post.insertComment(comment)
                .then(addComments => {
                    res.status(200).json(addComments)
                })
                .catch(error => {
                res.status(500).json({ error: 'no comment added' })
                })
        }
    }
})



router.delete('/:id', (req, res) => {
    const { id } = req.params

    Post.remove(id)
        .then(post => {
            if(!id){
                return res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                return res.status(200).json(post)
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

//     const newData = []

//     Post.findById(req.params.id)
//         .then((data) => {
//             if(data[0]){
//                 newData.push(data)
//             } else {
//                return res.status(404).json({ error: '404'})
//             }
            
//         })
//         .catch( error => {
//            return res.status(500).json({ error: "id does not exist" })
//         })

//     Post.remove(req.params.id)
//         .then((rmData) => {
//             res.status(200).json(newData)
//     })
//     .catch(error => {
//         res.status(500).json({ error: 'this post could not be deleted' })
//     })
// })


module.exports = router