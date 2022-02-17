function getRandomUserId() {
    const currentUserId = parseInt(document.getElementById('userId').value);

    // get all users length as maximum
    fetch('/api/users')
        .then((res) => {
            return res.json();
        })
        .then((totalUsers) => {
            const randomUserId = Math.floor(Math.random() * totalUsers.length);
            const filteredUsers = totalUsers.filter(
                (users) => users.id !== currentUserId
            );

            console.log(filteredUsers[randomUserId]);
            const newUserId = filteredUsers[randomUserId];
            return newUserId;
        });
}

function getNewChatId() {
    // get all users length as maximum
    fetch('/api/chat')
        .then((res) => {
            return res.json();
        })
        .then((totalChats) => {
            const newChatId = totalChats + 1;

            return newChatId;
        });
}

function randomMessageHandler(newUserId, newChatId) {
    fetch('/api/messages/recent', { method: 'GET' })
        .then(response => response.json())
        .then(data => {

            data.forEach(element => {
                let recentLi = document.createElement("li");
                let recentLink = document.createElement('a');
                recentLink.setAttribute('href', `/chat/${element.id}`);

                if (element.id == pageUrl[pageUrl.length - 1]) {
                    recentLi.className = "selected";
                }

                recentLink.appendChild(recentLi);
                recentList.appendChild(recentLink);
            });
        })
        .catch(response => document.location.reload());

    //console.log(totalUsers);

    // use maximum to generate random number, start at 1

    // get user id from data-user attribute in send message button
    //   const userId = document
    //     .querySelector('#send-message-btn')
    //     .getAttribute('data-user');

    //   // check that the random id doesn't match the user id
    //   // TO DO: also check that the id isn't someone you are already in a chat with
    //   if (randomUserId !== userId) {
    //     // TO DO: generate new chat page using the randomUserId
    //     // TO DO: get all existing chat IDs and generate a new one with this new user
    //     // LOAD page of chat/:id (using the new chat id)
    //   } else {
    //     // run the function again to generate new number that doesn't match the user's ID
    //     randomMessageHandler();
    //   }
}

async function sendMessageFormHandler(event) {
    event.preventDefault();

    const message_text = document.querySelector('#message').value.trim();
    // get the id of the logged in user in the data-user attribute
    const sender_id = document
        .querySelector('#send-message-btn')
        .getAttribute('data-user');
    // grab the end of the URL and assign to receiver_id
    const receiver_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (message_text) {
        const response = await fetch('/api/messages', {
            method: 'post',
            body: JSON.stringify({
                sender_id,
                receiver_id,
                message_text,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response.body);

        if (response.ok) {
            // reload current page so new message will be added to thread
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('.send-message')
    .addEventListener('submit', sendMessageFormHandler);

document
    .getElementById('randomBtn')
    .addEventListener('click', randomMessageHandler);