async function randomMessageHandler() {

    const totalUsers = await fetch('/api/users');
    totalUsers = totalUsers.length;

    const randomUserId = Math.floor(Math.random() * totalUsers);

    if (randomUserId !== require.session.id) {
        const response = await fetch('/api/users/' + totalUsers);
    }

}

async function sendMessageFormHandler(event) {
    event.preventDefault();

    const message_text = document.querySelector('#message').value.trim();
    const sender_id = req.session.id;
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

        if (response.ok) {
            // reload current page so new message will be added to thread
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.send-message').addEventListener('submit', sendMessageFormHandler);