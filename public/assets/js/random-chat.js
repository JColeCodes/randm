async function getOtherUserId() {
  // Get current user's id
  const currentUserId = parseInt(
    document.querySelector('#random-btn').getAttribute('data-user')
  );

  // Get all users length as maximum
  fetch('/api/users')
    .then((res) => {
      return res.json();
    })
    .then((totalUsers) => {
      const usersArray = [];

      // Loop through each user and add them to a list if they are not current user
      totalUsers.forEach((user) => {
        if (user.id !== currentUserId) {
          usersArray.push(user.id);
        }
      });

      checkCurrentMessages(usersArray);
    });
}

// Get recent messages and compare users against all users
async function checkCurrentMessages(usersArray) {
  fetch('/api/messages/recent', { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // Iterate through recent messages to make sure user isn't already chatting
        data.forEach((user) => {
          // If user exists, remove from user array
          if (usersArray.includes(user.id)) {
            usersArray.splice(usersArray.indexOf(user.id), 1);
          }
        });
      }
      // Get random number based on number of users (0 to array length)
      const randomUserId = Math.floor(Math.random() * usersArray.length);
      // Go to url for that user
      document.location.replace(`/chat/${usersArray[randomUserId]}`);
    });
}

document.getElementById('random-btn').addEventListener('click', getOtherUserId);