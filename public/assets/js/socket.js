const socket = io();
document.querySelector('.send-message').addEventListener('submit', event => {
    event.preventDefault();
    socket.emit('new message', document.querySelector('#message').value);
});
socket.on('new message', message => {
    const senderId = document.querySelector('#send-message-btn').getAttribute('data-user');
    var currentId = document.location.href.split('/');
    currentId = currentId[currentId.length - 1].split('#');
    const messageClass = (senderId, currentId) => {
        if (senderId !== currentId) {
            return 'received';
        }
        return 'sent';
    }
    function msgTime() {
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
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
    }
    
    let messageLi = document.createElement('li');
    messageLi.className = messageClass(senderId, currentId[0]);
    messageLi.innerHTML = `<div class="message">${message}</div>
    <p class="sent-time">${msgTime()}</p>`;
    
    console.log(messageLi);

    document.querySelector('#chat-messages').appendChild(messageLi);
});