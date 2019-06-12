const Post = require('../models/Posts');

module.exports = {
    async create(req, res) {
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save()

        req.io.emit('post', post);

        return res.json(post);
    },
    
};