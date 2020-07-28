import io from 'socket.io-client';

var url = window.location.protocol + '//' + window.location.host + '/';

export const socket = io(url);
