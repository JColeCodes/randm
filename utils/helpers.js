module.exports = {
    get_chat_class: (senderId, currentId) => {
        if (senderId !== currentId) {
            return 'received';
        }
        return 'sent';
    }
}