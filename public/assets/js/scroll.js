var chatMessages = document.querySelector('#chat-messages');

console.log(chatMessages.scrollTop);

//chatMessages.style.height = chatMessages.scrollHeight + 'px';

chatMessages.scrollTop = chatMessages.scrollHeight;

console.log(chatMessages.clientHeight);

console.log(chatMessages.scrollHeight);

console.log(window.innerHeight);

console.log(chatMessages.style.height);

if (chatMessages.clientHeight > chatMessages.scrollHeight) {
    chatMessages.className = 'short';
}