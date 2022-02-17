async function randomMessageHandler() {

    // get all users length as maximum
    const totalUsers = await fetch('/api/users');
    totalUsers = totalUsers.length;

    // use maximum to generate random number, start at 1
    const randomUserId = Math.floor((Math.random() * totalUsers) + 1);

    // get user id from data-user attribute in send message button
    const userId = document.querySelector('#send-message-btn').getAttribute('data-user');

    // check that the random id doesn't match the user id
    // TO DO: also check that the id isn't someone you are already in a chat with
    if (randomUserId !== userId) {
        // TO DO: generate new chat page using the randomUserId
        // TO DO: get all existing chat IDs and generate a new one with this new user
        // LOAD page of chat/:id (using the new chat id)
    } else {
        // run the function again to generate new number that doesn't match the user's ID
        randomMessageHandler();
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