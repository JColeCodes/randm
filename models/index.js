const User = require('./User');
const Message = require('./Message');

User.hasMany(Message, {
    foreignKey: 'sender_id'
});
Message.belongsTo(User, {
    foreignKey: 'sender_id'
});

User.hasMany(Message, {
    foreignKey: 'receiver_id'
});
Message.belongsTo(User, {
    foreignKey: 'receiver_id'
});


module.exports = { User, Message };