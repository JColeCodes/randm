const router = require('express').Router();
const { User, Message } = require('../../models');

// GET ROUTE

// find all messages
router.get('/', (req, res) => {
    Message.findAll({
            include: [{
                model: User
                    // add attributes
            }]
        })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
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
            // need to update to match Message.js
            // account for user_2?
            message: req.body.message,
            message_id: req.body.message_id,
            user_id: req.body.post_id
                // use the id from the session
                //user_id: req.session.user_id
        })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
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
                id: req.params.id
            }
        })
        .then(dbMessageData => {
            if (!dbMessageData) {
                res.status(404).json({ message: 'No message found with this id' });
                return;
            }
            res.json(dbMessageData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;