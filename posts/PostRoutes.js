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



// router.get('/api/posts/:id', (req, res) => {
//     Post.findById(req.params.id)
//         .then((data) => {
//             res.status(200).json(data)
//         })
//         .catch( error => {
//             res.status(500).json({ error: "id does not exist" })
//         })
// })



// router.post('/api/posts/:id/comments', (req, res) => {

//     req.body.post_id = req.params.id;

//     if(!req.body.text){
//        return res.status(400).json({error: 'bad request'})
//     }
//     Post.insertComment(req.body)
//     .then(addComments => {
//             res.status(200).json(addComments)
//     })
//     .catch(error => {
//         res.status(500).json({ error: 'no comment added' })
//     })
// })



// router.post('/api/posts', (req, res) => {
//     if(!req.body.title || !req.body.content){
//         return res.status(400).json({error: 'no title or content'})
//      }
//     Post.insert(req.body)
//     .then(postId => {
//             res.status(200).json(postId)
//     })
//     .catch(error => {
//         res.status(500).json({ error: 'no post ID' })
//     })

// })



// router.delete('/api/posts/:id', (req, res) => {

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
//     .then((rmData) => {
//             res.status(200).json(newData)
//     })
//     .catch(error => {
//         res.status(500).json({ error: 'this post could not be deleted' })
//     })
// })


module.exports = router