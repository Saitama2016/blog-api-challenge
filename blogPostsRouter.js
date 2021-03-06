const express = require('express');
const router = express.Router();

const {BlogPosts} = require('./models');

function paragraph() {
    return (
        "One, creator of One Punch Man and Mob Psycho 100," +
        " is an inspirational manga author because he can tell" +
        " an excellent narrative without meeting the visual standards"+
        " of mainstream manga."
    );
}

BlogPosts.create("Great Manga Authors in Recent Years!", paragraph(), "Super Eyepatch Wolf");
BlogPosts.create("Underdogs of Shonen", paragraph(), "MasakoX");

//Begin get request
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

//Begin post request with create function
router.post('/', (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\`in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
        res.status(201).json(item);
});

//Begin put request with update function 
router.put('/:id', (req, res) => {
    const requiredFields = ['id', 'title', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\`in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }

    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blog post item \`${req.params.id}\``);
    BlogPosts.update({
        id: req.params.id, 
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).end();
});

//Begin delete request
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post \`${req.params.ID}\``);
    res.status(204).end();
});

module.exports = router;