module.exports = {
  get_chat_class: (senderId, currentId) => {
    if (senderId !== currentId) {
      return 'received';
    }
    return 'sent';
  },
  format_time: (time) => {
    let hour = new Date(time).getHours();
    let minute = new Date(time).getMinutes();
    let meridiem = 'AM';
    if (hour > 11) {
      meridiem = 'PM';
    }
    if (hour > 12) {
      hour -= 12;
    } else if (hour == 0) {
      hour += 12;
    }
    if (String(minute).length == 1) {
      minute = '0' + String(minute);
    }
    return `${hour}:${minute} ${meridiem}`;
  },
  capitalize_first_name: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  last_name_initial: (string) => {
    return string.charAt(0).toUpperCase() + '.';
  },
};
