const recentList = document.querySelector('#recent-list');

function refreshPage() {
    window.location.reload();
}

async function displayRecentChat() {
    const response = await fetch('/api/messages/recent', { method: 'GET' });
    const data = await response.json();

    return data;
}

displayRecentChat()
    .then(data => {
        if (data.length > 0) {
            var pageUrl = document.location.href.split('/');
            pageUrl = pageUrl[pageUrl.length - 1].split('#');
            data.forEach(element => {
                let recentLi = document.createElement('li');
                let recentLink = document.createElement('a');
                recentLink.setAttribute('href', `/chat/${element.id}`);

                if (element.id == pageUrl[0]) {
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
    .catch(response => recentList.innerHTML = `<li class="error-msg">There's been an error displaying the recent chat list. <button onclick="refreshPage()" class="error-btn">Refresh the page <i class="fa-solid fa-rotate-right"></i></button></li>`);