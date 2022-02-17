const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message } = require('../models');

// GET all messages between two users, display in DESC order by created_at date/time
router.get('/', (req, res) => {
  Message.findAll({
    where: {
      // grab user id from the session data
      user_id: req.session.user_id,
    },
    attributes: ['id', 'created_at'],
    // display newest messages first
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
      },
    ],
  })
    .then((dbPostData) => {
      const messages = dbPostData.map((message) =>
        message.get({ plain: true })
      );

      res.render('homepage', {
        messages,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
