const User = require('./User');
const Message = require('./Message');
const Chat = require('./Chat');

User.hasMany(Chat, {
    foreignKey: 'chat_id'
});

Chat.belongsTo(User, {
    foreignKey: 'sender_id'
});

Chat.belongsTo(User, {
    foreignKey: 'receiver_id'
});

Message.hasMany(User, {
    foreignKey: 'sender_id'
});

Message.hasMany(User, {
    foreignKey: 'receiver_id'
});

Message.belongsToMany(User, {
    through: Chat,
    as: 'sent_messages',
    foreignKey: 'sender_id',
});

Message.belongsToMany(User, {
    through: Chat,
    as: 'received_messages',
    foreignKey: 'receiver_id',
});

module.exports = { User, Message };