const router = require('express').Router();
const { User, Message } = require('../models');
const { getUserLatest } = require('../utils/filters');
const { Op } = require('sequelize');

var sessionId;

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

// Show login page if user is logged out, but show /chat page if user is logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/chat');
    return;
  }
  res.render('login');
});

// Show register page if user is logged out, but show /chat page if user is logged in
router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/chat');
    return;
  }
  res.render('register');
});

// Finds information for currently logged in user to display information properly
router.get('/chat', (req, res) => {
  // Redirect to /login if not logged in
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  sessionId = req.session.user_id; // Get session user's id
  User.findAll({
    attributes: ['id', 'first_name', 'last_name']
  })
    .then((dbUserData) => {
      // Map users for plain javascript of data
      const user = dbUserData.map((user) => user.get({ plain: true }));

      // Gets information for current user
      const userLatest = getUserLatest(null, user, sessionId);

      // Renders page with chat handlebars
      res.render('chat', {
        userLatest,
        loggedIn: req.session.loggedIn,
        chatHome: true // Boolean for if chat is page home or user page
      });
    })
    // Error catch for User.findAll
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find all messages between two specific users
router.get('/chat/:id', (req, res) => {
  // Redirect to /login if not logged in
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  // If user is chatting with everyone, reroute undefined to chat home
  if (req.params.id == 'undefined') {
    res.redirect('/chat');
    return;
  }

  sessionId = req.session.user_id;
  // If user goes to page with their own id, redirect them to home, they can't chat alone
  if (req.params.id == sessionId) {
    res.redirect('/chat');
    return;
  }
  Message.findAll({
    where: {
      [Op.or]: [
        // If receiver id = session id AND sender id = param id
        { receiver_id: sessionId, sender_id: req.params.id },
        // OR receiver id = param id AND sender id = session id
        { receiver_id: req.params.id, sender_id: sessionId }
      ]
    },
    // Display all messages in order by message id
    order: [['id']]
  })
    .then((dbMessageData) => {
      // Gets all users and info
      User.findAll({
        attributes: [
          'id',
          'first_name',
          'last_name',
          'pronouns',
          'gender',
          'sexual_preference',
          'bio'
        ]
      })
        .then((dbUserData) => {
          // Map users for plain javascript of data
          const user = dbUserData.map((user) => user.get({ plain: true }));

          // Searches to see if the param id exists in the user table
          let userExist = false;
          user.forEach((user) => {
            if (user.id == req.params.id) {
              userExist = true;
              return;
            }
          });
          // If user does not exist, redirect to chat home
          if (!userExist) {
            res.redirect('/');
            return;
          }

          // Map messages for plain javascript of data
          const messages = dbMessageData.map((message) =>
            message.get({ plain: true })
          );

          // Gets information for current user
          const userLatest = getUserLatest(
            messages,
            user,
            sessionId,
            req.params.id
          );

          // Render all messages on specific chat page
          res.render('chat', {
            messages,
            userLatest,
            loggedIn: req.session.loggedIn,
            chatHome: false // Boolean for if chat is page home or user page
          });
        })
        // Error catch for User.findAll
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    // Error catch for Message.findAll
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Redirect to homepage for any page that does not exist
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;