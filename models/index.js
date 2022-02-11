const User = require('./User');
const Message = require('./Message');
const Chat = require('./Chat');

User.hasMany(Chat, { foreignKey: 'sender_id' });
User.hasMany(Chat, { foreignKey: 'receiver_id' });
Chat.belongsToMany(User, { foreignKey: 'sender_id' });
Chat.belongsToMany(User, { foreignKey: 'receiver_id' });

Message.belongsToMany(User, {
  through: Chat,
  as: 'chat_messages',
  foreignKey: 'user_id',
});

Chat.belongsToMany(User, {
  through: Chat,
  as: 'chat_messages',
  foreignKey: 'receiver_id',
});

module.exports = { User, Message };
