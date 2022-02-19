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
}

// use the new user id to check if current user is already chatting with them
async function checkCurrentMessages(usersArray) {
    console.log('checkCurrentMessages fnctin');
    fetch('/api/messages/recent', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.length == 0) {
                console.log('no data');
                const randomUserId = (Math.floor(Math.random() * usersArray.length));
                document.location.replace(`/chat/${usersArray[randomUserId]}`);
            } else {
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
            }
        })
}


document
    .getElementById('random-btn')
    .addEventListener('click', getOtherUserId);