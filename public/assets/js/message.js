
async function sendMessageFormHandler(event) {
  event.preventDefault();

  const message_text = document.querySelector('#message').value.trim();
  // get the id of the logged in user in the data-user attribute
  const sender_id = document
    .querySelector('#send-message-btn')
    .getAttribute('data-user');
  // console.log(sender_id);
  // grab the end of the URL and assign to receiver_id
  const receiver_id = parseInt(
    window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ]
  );

  if (message_text) {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        sender_id,
        receiver_id,
        message_text,
      }),
      headers: { 'Content-Type': 'application/json' },
    });


    if (!response.ok) {
        alert(response.statusText);
    }
  }
}

document
  .querySelector('.send-message')
  .addEventListener('submit', sendMessageFormHandler);
