const { Message } = require('../models');

const messageData = [
  {
    receiver_id: 2,
    message_text: 'Hi, how are you?',
    sender_id: 1,
  },
  {
    receiver_id: 1,
    message_text:
      'Hi there - good, how about you? What kind of music do you like?',
    sender_id: 2,
  },
  {
    receiver_id: 2,
    message_text:
      'I love basically everything, been listening to jazz a lot today. What about you?',
    sender_id: 1,
  },
  {
    receiver_id: 1,
    message_text: 'Nice, I like jazz and hip hop a lot!',
    sender_id: 2,
  },
  {
    receiver_id: 3,
    message_text: 'Hi, what is your favorite food?',
    sender_id: 2,
  },
  {
    receiver_id: 2,
    message_text: 'Hi! I love Thai food. What about you?',
    sender_id: 3,
  },
  {
    receiver_id: 3,
    message_text: 'Ooh I love Thai but my favorite is Italian',
    sender_id: 2,
  },
];

const seedMessages = () => Message.bulkCreate(messageData);

module.exports = seedMessages;
