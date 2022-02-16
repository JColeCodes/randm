module.exports = {
    getUserLatest: (messages, user, sessionId) => {
        var currentUser = user.filter(user => user.id === sessionId);
        currentUser = currentUser[0];

        const latestChat = [];
        messages.forEach(message => {
            user.forEach(user => {
                if (((message.sender_id !== sessionId && user.id === message.sender_id) || (message.receiver_id !== sessionId && user.id === message.receiver_id))) {
                    user.latestMessage = message.message_text;
                    if (!latestChat.includes(user)) {
                        latestChat.push(user);
                    }
                    
                }
            });
        });

        // if (req.params.id == sessionId) {
        //     res.redirect('/chat');
        //     return;
        // }

        return { currentUser, latestChat };
    }
}