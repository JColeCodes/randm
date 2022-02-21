module.exports = {
    getUserLatest: (messages, user, sessionId, paramId) => {
        var currentUser = user.filter(user => user.id == sessionId);
        currentUser = currentUser[0];

        var currentChatter = user.filter(user => user.id == paramId);
        currentChatter = currentChatter[0];
        if (!paramId) {
            currentChatter = null;
        }

        let latestChat = [];
        if (messages) {
            messages.forEach(message => {
                user.forEach(user => {
                    if (((message.sender_id !== sessionId && user.id === message.sender_id) || (message.receiver_id !== sessionId && user.id === message.receiver_id))) {
                        if (!latestChat.includes(user)) {
                            user.latest_message = message.message_text;
                            latestChat.push(user);
                        }
                    }
                });
            });
        }

        return { currentUser, currentChatter, latestChat };
    }
}