module.exports = {
  getUserLatest: (messages, user, sessionId, paramId) => {
    // Filters for the current user via session id
    var currentUser = user.filter((user) => user.id == sessionId);
    currentUser = currentUser[0];

    // Filters for current chatter via param id
    var currentChatter = user.filter((user) => user.id == paramId);
    currentChatter = currentChatter[0];
    if (!paramId) {
      currentChatter = null; // Returns null if on home /chat page
    }

    // Filters for an array of most recent chat messages per chatter
    let latestChat = [];
    if (messages) {
      messages.forEach((message) => {
        user.forEach((user) => {
          if (
            // If sender is user and user id is sender id
            (message.sender_id !== sessionId && user.id === message.sender_id) ||
            // OR if receiver is user and user id is sender id
            (message.receiver_id !== sessionId && user.id === message.receiver_id)
          ) {
            // Only do if latestChat array does not already include user
            if (!latestChat.includes(user)) {
              // Set latest message and push to array
              user.latest_message = message.message_text;
              latestChat.push(user);
            }
          }
        });
      });
    }

    return { currentUser, currentChatter, latestChat };
  }
};