const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message } = require('../models');
const { Op } = require('sequelize');
const { getUserLatest } = require('../utils/filters');

//const sessionId = 2;

// Redirect homepage to either login page (if not logged in) OR chat page (if logged in)
router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  } else {
    res.redirect('/chat');
    return;
  }
});

// show homepage if user is logged in, else render login.handlebars
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/chat');
    return;
  }

  res.render('login');
});

// show register page if user is logged out
router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/chat');
    return;
  }

  res.render('register');
});

var sessionId;
// // find all messages received or sent by user, display previews on homepage
router.get('/chat', (req, res) => {
  sessionId = req.session.user_id;
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  Message.findAll({
    where: {
      [Op.or]: [{ receiver_id: sessionId }, { sender_id: sessionId }],
    },
    // perform inner join on message table with message table to find all sent and received by one user?
    include: [
      {
        model: User,
        required: true,
        attributes: ['id', 'first_name', 'last_name'],
        include: {
          model: Message,
          required: true,
          // include message_text to display and created_at for date formatting
          attributes: ['receiver_id', 'sender_id'],
        },
      },
    ],
  })
    .then((dbMessageData) => {
      //res.json(dbUserData);

      User.findAll({
        // where: {
        //     id: sessionId
        // },
        // perform inner join on message table with message table to find all sent and received by one user?
        attributes: ['id', 'first_name', 'last_name'],
      })
        .then((dbUserData) => {
          //res.json(dbUserData);

          const user = dbUserData.map((user) => user.get({ plain: true }));
          // console.log(user);

          const messages = dbMessageData.map((message) =>
            message.get({ plain: true })
          );
          // console.log(messages);

          // console.log('HELLO!', req.session.user_id);
          const userLatest = getUserLatest(messages, user, sessionId);
          // console.log(userLatest.currentUser);

          // render all messages on homepage
          res.render('chat', {
            userLatest,
            loggedIn: req.session.loggedIn,
            chatHome: true,
          });
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

// find all messages between 2 specific users, use session id for user 1 and params id for user 2
router.get('/chat/:id', (req, res) => {
  sessionId = req.session.user_id;
  if (req.params.id == sessionId) {
    res.redirect('/chat');
    return;
  }
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  // if user is chatting with everyone, reroute undefined to chat home
  if (req.params.id == 'undefined') {
    res.redirect('/chat');
    return;
  }
  Message.findAll({
    where: {
      [Op.or]: [
        { receiver_id: sessionId, sender_id: req.params.id },
        { receiver_id: req.params.id, sender_id: sessionId },
      ],
    },
    include: [
      {
        model: User,
        // set required: true to produce an inner join
        required: true,
        attributes: [
          'first_name',
          'last_name',
          'pronouns',
          'gender',
          'sexual_preference',
          'bio',
        ],
        // include Message table from User table, require true for inner join
        include: {
          model: Message,
          required: true,
          // include message_text to display and created_at for date formatting
          attributes: ['message_text', 'created_at'],
        },
      },
    ],
    // display all messages in descending order by date created
    order: [['id']],
    // created_at was camelCase (createdAt) without adding attributes like this...
    attributes: [
      'id',
      'sender_id',
      'receiver_id',
      'message_text',
      'created_at',
    ],
  })
    .then((dbMessageData) => {
      User.findAll({
        // where: {
        //     id: sessionId
        // },
        // perform inner join on message table with message table to find all sent and received by one user?
        attributes: [
          'id',
          'first_name',
          'last_name',
          'pronouns',
          'gender',
          'sexual_preference',
          'bio',
        ],
      })
        .then((dbUserData) => {
          const user = dbUserData.map((user) => user.get({ plain: true }));
          //   console.log(user);

          const messages = dbMessageData.map((message) =>
            message.get({ plain: true })
          );
          //   console.log(messages);

          const userLatest = getUserLatest(
            messages,
            user,
            sessionId,
            req.params.id
          );
          //   console.log(userLatest);

          // render all messages on specific chat page, pass chatHome as false to signify not main chat page
          res.render('chat', {
            messages,
            userLatest,
            loggedIn: req.session.loggedIn,
            chatHome: false,
          });
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

module.exports = router;
