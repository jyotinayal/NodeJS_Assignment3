var createError = require('http-errors');
var express = require('express');
var path = require('path');
var routes = require('./routes/routes');

const app = express();
app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

const server = app.listen(3000, () => {
	console.log('Server up at 3000')
})
var io = require('socket.io')(server);
var clients = 0;
io.on('connection', function(socket) {
   clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});

