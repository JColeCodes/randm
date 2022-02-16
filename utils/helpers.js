module.exports = {
    get_chat_class: (senderId, currentId) => {
        if (senderId !== currentId) {
            return 'received';
        }
        return 'sent';
    },
    format_time: (time) => {
        let hour = new Date(time).getHours();
        const minute = new Date(time).getMinutes();
        let meridiem = 'AM';
        if (hour > 11) {
            meridiem = 'PM';
        }
        if (hour > 12) {
            hour -= 12;
        } else if (hour == 0) {
            hour += 12;
        }
        return `${hour}:${minute} ${meridiem}`;
    }
}