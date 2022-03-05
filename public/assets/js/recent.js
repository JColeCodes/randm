const recentList = document.querySelector('#recent-list');

async function displayRecentChat() {
    // Get recent messages
    const response = await fetch('/api/messages/recent', { method: 'GET' });
    const data = await response.json();

    // If data exists
    if (data.length > 0) {
        // Split page url
        var pageUrl = document.location.href.split('/');
        pageUrl = pageUrl[pageUrl.length - 1].split('#')[0];

        // For each recent chatters to display, create list element
        data.forEach((element) => {
            let recentLi = document.createElement('li');
            recentLi.setAttribute('id', `user-${element.id}`);

            // If currently on the page of, show it as selected
            if (element.id == pageUrl) {
                recentLi.className = 'selected';
            }

            // Link and text for display
            recentLi.innerHTML = `<a href="/chat/${element.id}"><div>
      <h3 class="name"> ${
        element.first_name.charAt(0).toUpperCase() +
        element.first_name.slice(1)
      } ${element.last_name.charAt(0).toUpperCase()}.</h3>
      <span class="latest-message">${element.latest_message}</span>
      </div></a>`;

            // Append to page
            recentList.appendChild(recentLi);
        });
    } else {
        // If no data, display no chat message
        recentList.innerHTML = `<li><div>You currently have no chats.</div></li>`;
    }
}

// If recent chat api fails to load, display error message
displayRecentChat().catch(
    (response) =>
    (recentList.innerHTML = `<li class="error-msg"><div>There's been an error displaying the recent chat list. <button onclick="window.location.reload()" class="error-btn">Refresh the page <i class="fa-solid fa-rotate-right"></i></button></div></li>`)
);