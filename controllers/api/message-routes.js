const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Message } = require('../../models');
const { Op } = require('sequelize');
const { getUserLatest } = require('../../utils/filters');
// GET ROUTE

// find all messages
router.get('/', (req, res) => {
  Message.findAll({
    include: [
      {
        model: User,
        // add attributes
      },
    ],
    //order: [['created_at', 'DESC']],
  })
    .then((dbMessageData) => res.json(dbMessageData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/recent', (req, res) => {
  if (!req.session.loggedIn) {
    return;
  }
  var sessionId = req.session.user_id;
  Message.findAll({
    where: {
      [Op.or]: [{ receiver_id: sessionId }, { sender_id: sessionId }],
    },
    include: [
      {
        model: User,
        required: true,
        attributes: ['id', 'first_name', 'last_name'],
      },
    ],
    order: [['createdAt', 'DESC']]
  })
    .then((dbMessageData) => {
      User.findAll({
        attributes: ['id', 'first_name', 'last_name'],
      })
        .then((dbUserData) => {
          //res.json(dbUserData);

          const user = dbUserData.map((user) => user.get({ plain: true }));
          //console.log(user);

          const messages = dbMessageData.map((message) =>
            message.get({ plain: true })
          );
          //console.log(messages);

          let userLatest = getUserLatest(messages, user, sessionId);

          res.json(userLatest.latestChat);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST ROUTE

// post new message
router.post('/', (req, res) => {
  // check the session login status
  //if (req.session) {
  Message.create({
    // will need to pull receiver id from /:id params
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id,
    message_text: req.body.message_text,
    // use the id from the session
    //user_id: req.session.user_id
  })
    .then((dbMessageData) => res.json(dbMessageData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  //}
});

// DELETE ROUTE

// delete message by id
router.delete('/:id', (req, res) => {
  Message.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbMessageData) => {
      if (!dbMessageData) {
        res.status(404).json({ message: 'No message found with this id' });
        return;
      }
      res.json(dbMessageData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
