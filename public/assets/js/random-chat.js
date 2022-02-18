async function getOtherUserId() {

    const currentUserId = parseInt(document
        .querySelector('#random-btn')
        .getAttribute('data-user'));
    console.log('currentUserId: ' + currentUserId);

    // get all users length as maximum
    fetch('/api/users')
        .then((res) => {
            return res.json();
        })
        .then((totalUsers) => {
            console.log('Total users: ' + totalUsers.length);

            const usersArray = [];

            totalUsers.forEach((user) => {
                if (user.id !== currentUserId) {
                    usersArray.push(user.id);
                }
            });
            console.log('usersArray: ' + usersArray);

            checkCurrentMessages(usersArray);
        })
        // .then(checkCurrentMessages(randomUserId));
}

// use the new user id to check if current user is already chatting with them
async function checkCurrentMessages(usersArray) {

    fetch('/api/messages/recent', { method: 'GET' })
        .then(response => response.json())
        .then(data => {

            // iterate through data in recent to make sure user isn't already chatting
            data.forEach(user => {

                if (usersArray.includes(user.id)) {
                    usersArray.splice(usersArray.indexOf(user.id), 1)
                }
                console.log(usersArray);

                // random number from total users, minus 1 for self and plus 1 to exclude 0
                console.log(usersArray.length);
                const randomUserId = (Math.floor(Math.random() * usersArray.length));
                console.log('randomUserId: ' + usersArray[randomUserId]);


                document.location.replace(`/chat/${usersArray[randomUserId]}`);
            });

        })
        // .then(randomUserId => {
        //     document.location.replace(`/chat/${usersArray[randomUserId]}`);
        // });
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
    .addEventListener('click', getOtherUserId);