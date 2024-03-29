const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express project template' });
});

router.use("/auth", require("./auth"));
router.use("/profile", isAuthenticated, require("./profile"));

module.exports = router;
