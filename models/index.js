const User = require('./User');
const Message = require('./Message');

User.hasMany(Message, {
    foreignKey: 'sender_id'
});

Message.belongsTo(User, {
    foreignKey: 'sender_id'
});

module.exports = { User, Message };