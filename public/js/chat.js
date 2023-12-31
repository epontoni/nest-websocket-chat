const username = localStorage.getItem('name');

const statusOnline = document.querySelector('#status-online');
const statusOffline = document.querySelector('#status-offline');
const clientsList = document.querySelector('#clients-list');

const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElement = document.querySelector('#chat');

if (!username) {
  window.location.replace('/');
  throw new Error('Username is required');
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value;
    input.value = '';
    socket.emit('message', message);
});


const socket = io({
    auth: {
        token: '123',
        name: username,
    }
});

socket.on('connect', () => {
    console.log('connected');
    statusOnline.classList.remove('hidden');
    statusOffline.classList.add('hidden');
});

socket.on('clients', (clients) => {
  clientsList.innerHTML = '';
  clients.forEach((client) => {
    const li = document.createElement('li');
    li.innerText = `${client.name} (${client.id})`;
    clientsList.appendChild(li);
  });
});

socket.on('message', (data) => {
    const msgBox = document.createElement('div');
    msgBox.innerHTML = `${data.name}: ${data.message}`;
    if(data.name === username) {
        msgBox.classList.add('message');
    } else {
        msgBox.classList.add('message', 'incoming');
    }
    
    chatElement.appendChild(msgBox);
    chatElement.scrollTop = chatElement.scrollHeight;
});

socket.on('disconnect', () => {
    console.log('disconnected');
    statusOnline.classList.add('hidden');
    statusOffline.classList.remove('hidden');
});
