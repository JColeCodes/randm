const recentList = document.querySelector('#recent-list');

function displayRecentChat() {
    fetch('/api/messages/recent', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data.length > 0) {
                const pageUrl = document.location.href.split('/');
                data.forEach(element => {
                    let recentLi = document.createElement('li');
                    let recentLink = document.createElement('a');
                    recentLink.setAttribute('href', `/chat/${element.id}`);

                    if (element.id == pageUrl[pageUrl.length - 1]) {
                        recentLi.className = "selected";
                    }
                    recentLi.innerHTML = `
                    <h3 class="name"> ${element.first_name} ${element.last_name}</h3>
                    <span class="latest-message">${element.latestMessage}</span>`;

                    recentLink.appendChild(recentLi);
                    recentList.appendChild(recentLink);
                });
            } else {
                recentList.innerHTML = `<li>You currently have no chats.</li>`;
            }
        })
        .catch(response => document.location.reload());
}

displayRecentChat();