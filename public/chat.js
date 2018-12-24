// Make connection
var socket = io.connect('http://localhost:5000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedbakc = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value ? handle.value : 'Anonymous'
  });
  message.value = "";
});

message.addEventListener('keypress', () => {
   socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
   feedbakc.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data)=> {
   feedbakc.innerHTML = `<p><em>${data? data : 'Anonymous'} is typing the message</em></p>`;
})