const router = require('express').Router();
const { User, Message } = require('../../models');

// GET ROUTES

// Get all users
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// find one user by id
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                model: Message,
                attributes: ['id', 'user_1', 'user_2', 'messages', 'created_at']
            }]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST ROUTES

// add user to database on sign up
router.post('/', (req, res) => {
    /* expects {
        "email": "myemail@email.com", 
        "password": "password1234",
        "first_name": "user",
        "last_name": "name",
        "bio": "I am really interesting",
        "gender": "non-binary",
        "sexual_preference": "pansexual",
        "pronouns": "they/them",
        "birthday": "03/03/2003"
        "blocked": [ user_id, user_id ]
    }
    */
    User.create(req.body)
        .then(dbUserData => {
            // save username and id to session and set loggedIn to true
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.email = dbUserData.email;
                req.session.loggedIn = true;
                // JSON response
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login verification post route to /login endpoint
router.post('/login', (req, res) => {
    // expects {"email": "myemail@email.com", "password": "password1"}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with that email address' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }
        // save session data, set status to loggedIn true
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'Login successful' });
        });
    });
});

// destroy the session on logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT ROUTE

// allow user to update their information
router.put('/:id', (req, res) => {
    // expects some or all user info to update
    // pass in req.body, only update what's passed through
    User.update(req.body, {
            // set hooks to true to hash the updated password
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE ROUTE

// delete a user by id
router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;