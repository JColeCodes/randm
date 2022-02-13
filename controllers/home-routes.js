const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message } = require('../models');

// show homepage if user is logged in, else render login.handlebars
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
