const express = require('express'),
    router = express.Router(),
    PostModel = require('../models/posts');

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.send('welcome to my api').status(200);
});

router.get('/all', async (req, res, next) => {
    const allPosts = await PostModel.getAll();

    res.json(allPosts).status(200);
});

router.get('/post/:post_id?', async (req, res, next) => {
    const postID = req.params.post_id;
    const thePost = await PostModel.getById(postID);
    console.log(thePost)
    res.json(thePost).status(200);
})

router.get('/delete/:post_id?', async (req, res, next) => {
    const { post_id } = req.params;
    const response = await PostModel.removeEntry(post_id);

    (response.command === 'DELETE' && response.rowCount >= 1) ? res.sendStatus(200) : res.send(`Could not delete post id:${post_id}`).status(409);
})

module.exports = router;
