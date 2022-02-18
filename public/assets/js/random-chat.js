function getRandomUserId() {

    console.log('random button clicked');
    const currentUserId = parseInt(document.getElementById('userId').value);
    console.log(currentUserId);

    // // get all users length as maximum
    // fetch('/api/users')
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then((totalUsers) => {
    //         const randomUserId = Math.floor(Math.random() * totalUsers.length);
    //         const filteredUsers = totalUsers.filter(
    //             (users) => users.id !== currentUserId
    //         );
    //         console.log('--------------------FROM getRandomUserId----------------------');
    //         console.log('Filtered users random id: ' + filteredUsers[randomUserId]);
    //         const newUserId = filteredUsers[randomUserId];
    //         return newUserId;
    //     })
    //     .then(checkCurrentMessages(newUserId));
}

// use the new user id to check if current user is already chatting with them
async function checkCurrentMessages(newUserId) {
    fetch('/api/messages/recent', { method: 'GET' })
        .then(response => response.json())
        .then(data => {

            potentialUsers = [];
            console.log('--------------------FROM checkCurrentMessages----------------------');

            // iterate through data in recent to make sure user isn't already chatting
            data.forEach(user => {
                console.log(user);
                // if not, push those numbers to potentialUsers array
                // randomly pull number from potentialUsers array
                // assign to newRandomId variable
                // pass that to randomMessageHandler as the recevier_id for a new message from current user
                //return newRandomId;
            });

        })
        .then(randomMessageHandler(newRandomId));
}

async function randomMessageHandler(newRandomId) {

    const message_text = 'Hi, let\'s start a new random chat together';
    const sender_id = parseInt(document.getElementById('userId').value);
    const receiver_id = newRandomId;

    const response = await fetch('/api/messages', {
        method: 'post',
        body: JSON.stringify({
            sender_id,
            receiver_id,
            message_text,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

}

// async function sendMessageFormHandler(event) {
//     event.preventDefault();

//     const message_text = document.querySelector('#message').value.trim();
//     // get the id of the logged in user in the data-user attribute
//     const sender_id = document
//         .querySelector('#send-message-btn')
//         .getAttribute('data-user');
//     console.log(sender_id);
//     // grab the end of the URL and assign to receiver_id
//     const receiver_id = parseInt(window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ]);

//     if (message_text) {
//         const response = await fetch('/api/messages', {
//             method: 'POST',
//             body: JSON.stringify({
//                 sender_id,
//                 receiver_id,
//                 message_text,
//             }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }

// document
//     .querySelector('.send-message')
//     .addEventListener('submit', sendMessageFormHandler);

document
    .getElementById('random-btn')
    .addEventListener('click', getRandomUserId);