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
                recentLi.setAttribute('id' , `user-${element.id}`);

                if (element.id == pageUrl[0]) {
                    recentLi.className = "selected";
                }

                recentLi.innerHTML = `<a href="/chat/${element.id}"><div>
                <h3 class="name"> ${element.first_name.charAt(0).toUpperCase() + element.first_name.slice(1)} ${element.last_name.charAt(0).toUpperCase()}.</h3>
                <span class="latest-message">${element.latest_message}</span>
                </div></a>`;

                recentList.appendChild(recentLi);
            });
        } else {
            recentList.innerHTML = `<li>You currently have no chats.</li>`;
        }
    })
    .catch(response => recentList.innerHTML = `<li class="error-msg">There's been an error displaying the recent chat list. <button onclick="refreshPage()" class="error-btn">Refresh the page <i class="fa-solid fa-rotate-right"></i></button></li>`);