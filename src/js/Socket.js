import io from 'socket.io-client'

//var socket = io.connect('http://192.168.56.53:8080')
//socket.broadcast.emit('chat message', 'TEST SOCKET');

var socket = io('http://192.168.56.53:8081', { query: { cId: 1, gId: 1 }});
//var socket = io('http://192.168.56.53:8080', { extraHeaders: { Authorization: "Bearer 30001:30001" });
console.log(socket);
//socket.broadcast.emit('chat message', 'TEST SOCKET');

// socket.emit('chat message', 1, 1, 1, 'TEST');
// socket.on('chat message', function(data){
//     console.log(data);
// });

export default socket