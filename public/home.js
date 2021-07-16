var socket = io();
        socket.on('broadcast',function(data) {  
           document.getElementById('list').innerText = data.description;
        });