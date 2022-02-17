const recentList = document.querySelector('#recent-list');
  
function displayRecentChat() {
    fetch('/api/messages/recent', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const pageUrl = document.location.href.split('/');
            data.forEach(element => {
                let recentLi = document.createElement("li");
                if (element.id == pageUrl[pageUrl.length - 1]){
                    recentLi.className = "selected";
                }
                recentLi.innerHTML = `<a href="/chat/${element.id}">
                <h3 class="name"> ${element.first_name} ${element.last_name}</h3>
                <span class="latest-message">${element.latestMessage}</span>
                </a>`;
                
                recentList.appendChild(recentLi);
            });
        })
        .catch(response => alert(response.statusText));
}

displayRecentChat();