let currId = 0;
let pageId = 0;

const socket = io();
document.querySelector('.send-message').addEventListener('submit', event => {
    event.preventDefault();

    pageId = document.location.href.split('/');
    pageId = pageId[pageId.length - 1].split('#')[0];
    if (pageId.includes('?')) {
        pageId = pageId.split('?')[0];
    }

    //console.log(document.querySelector(`#user-${pageId}`).textContent);

    currId = document.querySelector('#send-message-btn').getAttribute('data-user');
    console.log(currId, pageId);
    
    if (document.querySelector('#message').value === '') {
        return;
    }
    socket.emit('new message', { 
        message: document.querySelector('#message').value,
        from: currId,
        to: pageId
    });
});
socket.on('new message', data => {
    const message = data.message;

    const fromId = data.from;
    const toId = data.to;

    const senderId = document.querySelector('#send-message-btn').getAttribute('data-user');
    let pageUrl = document.location.href.split('/');
    pageUrl = pageUrl[pageUrl.length - 1].split('#')[0];
    if (pageUrl.includes('?')) {
        pageUrl = pageUrl.split('?')[0];
    }

    const recentList = document.querySelector('#recent-list');

    if (fromId == senderId) {
        document.querySelector(`#user-${toId}`).innerHTML = `<div><h3 class="name">${document.querySelector(`#user-${toId} .name`).textContent}</h3>
        <span class="latest-message">${message}</span></div>`;
        recentList.insertBefore(document.querySelector(`#user-${toId}`), recentList.children[0]);
    } else if (toId == senderId) {
        document.querySelector(`#user-${fromId}`).innerHTML = `<div><h3 class="name">${document.querySelector(`#user-${fromId} .name`).textContent}</h3>
        <span class="latest-message">${message}</span></div>`;
        recentList.insertBefore(document.querySelector(`#user-${fromId}`), recentList.children[0]);
    }

    if ((fromId == senderId && toId == pageUrl) || (fromId == pageUrl && toId == senderId)) {
    
        const messageClass = (senderId, fromId) => {
            if (senderId != fromId) {
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
        messageLi.className = messageClass(senderId, fromId);
        messageLi.innerHTML = `<div class="message">${message}</div>
        <p class="sent-time">${msgTime()}</p>`;
        
        console.log(messageLi);

        document.querySelector('#chat-messages').appendChild(messageLi);

        document.querySelector('#message').value = '';
    }
    currId = 0;
    pageId = 0;
});