const username = localStorage.getItem('name');

const statusOnline = document.querySelector('#status-online');
const statusOffline = document.querySelector('#status-offline');

if (!username) {
  window.location.replace('/');
  throw new Error('Username is required');
}

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

socket.on('disconnect', () => {
    console.log('disconnected');
    statusOnline.classList.add('hidden');
    statusOffline.classList.remove('hidden');
});
