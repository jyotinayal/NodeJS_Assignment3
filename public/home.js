
var socket = io();
        socket.on('posts',function(data) {  
           document.getElementById('list').innerText =  data.post;
        });

       
    