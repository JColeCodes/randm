module.exports = {
    getUserLatest: (messages, user, sessionId, paramId) => {
        var currentUser = user.filter(user => user.id == sessionId);
        currentUser = currentUser[0];

        var currentChatter = user.filter(user => user.id == paramId);
        currentChatter = currentChatter[0];
        if (!paramId) {
            var currentChatter = null;
        }

        console.log(paramId, currentChatter);

        const latestChat = [];
        if (messages) {
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
        }
        
        // if (req.params.id == sessionId) {
        //     res.redirect('/chat');
        //     return;
        // }

        return { currentUser, currentChatter, latestChat };
    }
}