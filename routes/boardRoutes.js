const express = require('express');
const router = express.Router();
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');  // Utiliza el mismo nombre para consistencia

// Monta las rutas relacionadas con los posts
router.use('/posts', postRouter);

// Monta las rutas relacionadas con los comentarios
router.use('/comment', commentRouter);

module.exports = router;
