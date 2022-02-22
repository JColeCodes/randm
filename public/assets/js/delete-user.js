async function deleteUser() {
  const logoutBtn = document.getElementById('logout-btn');

  const currentUserId = parseInt(
    document.querySelector('#random-btn').getAttribute('data-user')
  );

  const response = await fetch('/api/users/' + currentUserId, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    logoutBtn.click(); // Logs user out when account is deleted
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#delete-btn').addEventListener('click', deleteUser);