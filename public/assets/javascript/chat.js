async function randomMessageHandler() {

    // get all users length as maximum

    const totalUsers = await fetch('/api/users');
    totalUsers = totalUsers.length;

    const randomUserId = Math.floor(Math.random() * totalUsers);
    // get user id from data-user attribute in send message button
    const userId = document.querySelector('#send-message-btn').getAttribute('data-user');

    // check that the random id doesn't match the user id
    if (randomUserId !== userId) {
        const response = await fetch('/api/users/' + totalUsers);
    }

}

async function sendMessageFormHandler(event) {
    event.preventDefault();

    const message_text = document.querySelector('#message').value.trim();
    // get the id of the logged in user in the data-user attribute
    const sender_id = document.querySelector('#send-message-btn').getAttribute('data-user');
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
                message_text
            }),
            headers: { 'Content-Type': 'application/json' }
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

document.querySelector('.send-message').addEventListener('submit', sendMessageFormHandler);