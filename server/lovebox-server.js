var Jimp = require('jimp');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require("fs");
var bodyparser = require("body-parser");



app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'www')));
// used to parse get data in url encode format
app.use(bodyparser.urlencoded({ extended: true }));
 

const web_Page_Directory = __dirname + "/www";

app.get('/',function(req,res){
	res.sendFile("index.html", {root: web_Page_Directory});
});




app.post('/getDrawing',function(req,res){
	var imageDataString = req.body.imageDataString; // 128*128

	if(lovebox_sock == null){
		console.log("No Lovebox sock");
	} else {
		lovebox_sock.write(imageDataString);
	}
	
});




http.listen(8432, function() {
	console.log('listening on *:8432');
	console.log(__dirname);
});




var net = require('net');
var lovebox_sock;



var HOST = '198.50.245.94';
var PORT = 6924;

var connectedUsers = new Array();


net.createServer(function(sock) {

    console.log('LOVE BOX CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    lovebox_sock = sock;
    
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        lovebox_sock = null;
    });
    
    
    
}).listen(PORT, HOST);


console.log('LoveBox Server on ' + HOST +':'+ PORT);



