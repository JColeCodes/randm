let currId = 0;
let pageId = 0;

const socket = io(); // SOCKET.IO

// On submit button click, get information about the user who is sending a message
document.querySelector('.send-message').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get id of message recipient
    pageId = document.location.href.split('/');
    pageId = pageId[pageId.length - 1].split('#')[0];
    if (pageId.includes('?')) {
        pageId = pageId.split('?')[0];
    }

    // Get id of current user
    currId = document
        .querySelector('#send-message-btn')
        .getAttribute('data-user');

    // If there is no message, do not continue
    if (document.querySelector('#message').value.trim() === '') {
        return;
    }
    // Emit the following information
    socket.emit('new message', {
        message: document.querySelector('#message').value,
        from: currId,
        to: pageId
    });
});

// Socket on taking in the information from the emit
socket.on('new message', (data) => {
    // Message text content
    const message = data.message;
    // Ids of sender and recipient
    const fromId = data.from;
    const toId = data.to;
    // Get id of the user currently logged in (across all users on the page)
    const senderId = document
        .querySelector('#send-message-btn')
        .getAttribute('data-user');
    // Get id of the recipient (across all users on the page)
    let pageUrl = document.location.href.split('/');
    pageUrl = pageUrl[pageUrl.length - 1].split('#')[0];
    if (pageUrl.includes('?')) {
        pageUrl = pageUrl.split('?')[0];
    }

    // Live update of the recent message display
    const recentList = document.querySelector('#recent-list');

    if (fromId == senderId) {
        let toRecentChatDiv = document.querySelector(`#user-${toId}`);
        // if div exists remove before adding to page
        if (toRecentChatDiv) {
            toRecentChatDiv.parentElement.removeChild(toRecentChatDiv);
        }
        // If the message is sent by current user
        let toNewRecentChatDiv = document.createElement('li');
        toNewRecentChatDiv.setAttribute('id', `user-${toId}`);

        toNewRecentChatDiv.innerHTML = `<a href="/chat/${toId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

        recentList.insertBefore(toNewRecentChatDiv, recentList.children[0]);

        // Put on top of the list
    } else if (toId == senderId) {
        let fromRecentChatDiv = document.querySelector(`#user-${fromId}`);
        // if div exists remove before adding to page
        if (fromRecentChatDiv) {
            fromRecentChatDiv.parentElement.removeChild(fromRecentChatDiv);
        }
        // If the message is sent by current user
        let fromNewRecentChatDiv = document.createElement('li');
        fromNewRecentChatDiv.setAttribute('id', `user-${fromId}`);

        fromNewRecentChatDiv.innerHTML = `<a href="/chat/${fromId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

        recentList.insertBefore(fromNewRecentChatDiv, recentList.children[0]);
    }


    // Live update of messages
    if (
        // If message is sent by current user AND the recipient is in the url
        (fromId == senderId && toId == pageUrl) ||
        // OR message is sent by the user in the page url AND the recipient is current user
        (fromId == pageUrl && toId == senderId)
    ) {
        // Gets class name for message display depending on who sent/received
        const messageClass = (senderId, fromId) => {
            if (senderId != fromId) {
                return 'received';
            }
            return 'sent';
        };
        // Get time at message send
        function msgTime() {
            return new Date().toLocaleString('en-US', {
                hour12: true,
                hourCycle: 'h12',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        // Create list element with the message and send time
        let messageLi = document.createElement('li');
        messageLi.className = messageClass(senderId, fromId);
        messageLi.innerHTML = `<div class="message">${message}</div>
      <p class="sent-time">${msgTime()}</p>`;

        // Append to chat messages list
        document.querySelector('#chat-messages').appendChild(messageLi);

        // Clear message input text box
        document.querySelector('#message').value = '';
    }
    // Reset currId and pageId once message is sent and page displays message
    currId = 0;
    pageId = 0;
});