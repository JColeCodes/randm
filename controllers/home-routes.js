const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message } = require('../models');
const { Op } = require('sequelize');

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


// // find all messages received or sent by user, display previews on homepage
router.get('/chat', (req, res) => {
    Message.findAll({
            where: {
                [Op.or]: [
                    { receiver_id: 1 },
                    { sender_id: 1 }
                ]
            },
            // perform inner join on message table with message table to find all sent and received by one user?
            include: [{
                model: User,
                required: true,
                attributes: ['id', 'first_name', 'last_name'],
                include: {
                    model: Message,
                    required: true,
                    // include message_text to display and created_at for date formatting
                    attributes: ['receiver_id', 'sender_id']
                }
            }]
        })
        .then(dbMessageData => {
            //res.json(dbUserData);

            User.findAll({
                    where: {
                        id: 1
                    },
                    // perform inner join on message table with message table to find all sent and received by one user?
                    attributes: ['id', 'first_name'],
                    include: [{
                        model: Message,
                        required: true
                    }]
                })
                .then(dbUserData => {
                    //res.json(dbUserData);

                    const user = dbUserData.map(user => user.get({ plain: true }));
                    console.log(user);

                    const messages = dbMessageData.map(message => message.get({ plain: true }));
                    console.log(messages);

                    // render all messages on homepage
                    res.render('chat', {
                        messages,
                        user,
                        loggedIn: req.session.loggedIn,
                        chatHome: true
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// find all messages between 2 specific users, use session id for user 1 and params id for user 2
router.get('/chat/:id', (req, res) => {
    Message.findAll({
            where: {
                sender_id: req.session.id,
                receiver_id: req.params.id
            },
            include: [{
                model: User,
                // set required: true to produce an inner join
                required: true,
                attributes: ['first_name', 'last_name', 'pronouns', 'gender', 'sexual_preference', 'bio'],
                // include Message table from User table, require true for inner join
                include: {
                    model: Message,
                    required: true,
                    // include message_text to display and created_at for date formatting
                    attributes: ['message_text', 'created_at']
                }
            }],
            // display all messages in descending order by date created
            order: [
                ['created_at', 'DESC']
            ]
        })
        .then(dbMessageData => {

            User.findAll({
                    where: {
                        id: 1
                    },
                    // perform inner join on message table with message table to find all sent and received by one user?
                    attributes: ['id', 'first_name'],
                    include: [{
                        model: Message,
                        required: true
                    }]
                })
                .then(dbUserData => {

                    const user = dbUserData.map(user => user.get({ plain: true }));
                    console.log(user);

                    const messages = dbMessageData.map(message => message.get({ plain: true }));
                    console.log(messages);

                    // render all messages on specific chat page, pass chatHome as false to signify not main chat page
                    res.render('chat', {
                        messages,
                        user,
                        loggedIn: req.session.loggedIn,
                        chatHome: false
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;