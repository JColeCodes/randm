module.exports = {
  get_chat_class: (senderId, currentId) => {
    if (senderId !== currentId) {
      return 'received';
    }
    return 'sent';
  },
  format_time: (time) => {
    return new Date(time).toLocaleString('en-US', {
      hour12: true,
      hourCycle: 'h12',
      hour: 'numeric',
      minute: '2-digit'
    });
  },
  capitalize_first_name: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  last_name_initial: (string) => {
    return string.charAt(0).toUpperCase() + '.';
  },
};
