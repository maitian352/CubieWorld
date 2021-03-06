

var express = require('express');
var app = express();
var serv = require('http').Server(app);
app.get('/',function(req,res){
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
if(process.env.PORT){
	SERVER = 'heroku';
	var port = serv.listen(process.env.PORT);
}
else{
	SERVER = 'localhost';
	var port = serv.listen(4000);
}
console.log('Server Started on port ' + port.address().port);
io = require('socket.io')(serv,{upgradeTimeout:360000});
io.sockets.on('connection',function(socket){
	socket.on('signIn',function(data){
		var d = new Date();
		var m = '' + d.getMinutes();
		var h = d.getHours() + 24;
		if(SERVER !== 'localhost'){
			h -= 5;
		}
		h = h % 24;
		h = '' + h;
		if(m.length === 1){
			m = '' + 0 + m;
		}
		if(m === '0'){
			m = '00';
		}
		console.error("[" + h + ":" + m + "] " + data.username);
	});
});