const express = require('express');
const routes = new express.Router();
require('express-group-routes');

const multer = require('multer');
const UploadConfig = require('./config/upload')
upload = multer(UploadConfig);

const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikesController')


routes.group('/posts', (router) => {
    router.get('/list', PostController.index);

    router.post('/create', upload.single('image'), PostController.create);

    router.get('/alter', (req, res) => {
        return res.send('alter post');
    });

    router.get('/delete', (req, res) => {
        return res.send('delete post');
    });

    router.post('/:id/like', LikeController.create);
    
});

// routes.get('/posts/:id/like', LikeController.teste);

routes.get('/',(req, res) => {
    return res.send('index api');
});


module.exports = routes;