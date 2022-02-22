const router = require('express').Router();
const { User, Message } = require('../../models');

// Get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password', 'email', 'birthday'] }
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find one user by id
router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password', 'email', 'birthday'] }
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add user to database on register
router.post('/', (req, res) => {
  /* Expects: {
    "email": "myemail@email.com", 
    "password": "password1234",
    "first_name": "user",
    "last_name": "name",
    "bio": "I am really interesting",
    "gender": "non-binary",
    "sexual_preference": "pansexual",
    "pronouns": "they/them",
    "birthday": "03/03/2003"
  } */
  User.create(req.body)
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login verification post route to /login endpoint
router.post('/login', (req, res) => {
  // Expects: {"email": "myemail@email.com", "password": "password1234"}
  User.findOne({
    where: { email: req.body.email }
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user found with that email address' });
      return;
    }

    // Check password validity
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }
    // Save session data and set status to loggedIn true
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'Login successful' });
    });
  });
});

// Destroy the session on logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Delete a user by id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;