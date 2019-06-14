const Post = require('../models/Posts');
const sharp = require('sharp');
const path = require('path');
// const fs = require('fs');

module.exports = {
    async index(req,res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts)
    },

    async create(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        // const [name] = image.split('.');
        // const filename = `${name}.jpg`

        await sharp(req.file.path)
                .resize(500)
                .jpeg({quality:70})
                .toFile(
                    path.resolve(req.file.destination, 'resizes', image)
                );

        // fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image
        });

        req.io.emit('post', post);

        return res.json(post)
    }
    
};