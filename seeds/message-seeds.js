const { Message } = require('../models');

const messageData = [{
        receiver_id: 2,
        message_text: 'Hi, how are you?'
    },
    {
        receiver_id: 1,
        message_text: 'Hi there - good, how about you? What kind of music do you like?'
    },
    {
        receiver_id: 2,
        message_text: 'I love basically everything, been listening to jazz a lot today. What about you?'
    },
    {
        receiver_id: 1,
        message_text: 'Nice, I like jazz and hip hop a lot!'
    },
    {
        receiver_id: 3,
        message_text: 'Hi, what is your favorite food?'
    },
    {
        receiver_id: 2,
        message_text: 'Hi! I love Thai food. What about you?'
    },
    {
        receiver_id: 3,
        message_text: 'Ooh I love Thai but my favorite is Italian'
    }
];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;