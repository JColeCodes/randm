async function sendMessageFormHandler(event) {
  event.preventDefault();

  const message_text = document.querySelector('#message').value.trim();
  // Get the id of the logged in user in the data-user attribute
  const sender_id = document.querySelector('#send-message-btn').getAttribute('data-user');
  // Get the end of the URL and assign to receiver_id
  let receiver_id = window.location.toString().split('/');
  receiver_id = parseInt(receiver_id[receiver_id.length - 1].split('#')[0]);

  if (message_text) {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        sender_id,
        receiver_id,
        message_text
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      alert(response.statusText);
    }
  }
}

document.querySelector('.send-message').addEventListener('submit', sendMessageFormHandler);