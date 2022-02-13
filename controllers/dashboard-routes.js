const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message } = require('../models');
const { Op } = require('sequelize');

// GET all messages between two users, display in DESC order by created_at date/time
router.get('/', (req, res) => {
  Message.findAll({
    where: {
      [Op.or]: [
        // grab user id from the session data
        { receiver_id: req.session.user_id },
        { sender_id: req.params.id },
      ],
      [Op.or]: [
        // grab user id from the session data
        { receiver_id: req.params.id },
        { sender_id: req.session.user_id },
      ],
    },
    attributes: ['id', 'message_text', 'created_at'],
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
