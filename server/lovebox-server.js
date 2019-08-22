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


app.get('/imagetest',function(req,res){
	
	var longAssString = ""
	
	var imageArray = new Array(128);
	
	for(var x = 0; x < imageArray.length; x++){
		imageArray[x] = new Array(128);
	}
	
	for(var x = 0; x < imageArray.length; x++){
		for(var y = 0; y < imageArray[x].length; y++){
			imageArray[x][y] = 1;
		}
	}
	
		for(var x = 0; x < imageArray.length; x++){
		for(var y = 0; y < imageArray[x].length; y++){
			longAssString += imageArray[x][y];
		}
	}
	
	
	res.send(longAssString);
});



app.post('/getDrawing',function(req,res){
	var imageDataString = req.body.imageDataString; // 128*128

	if(lovebox_sock == null){
		console.log("No Lovebox sock");
	} else {
		lovebox_sock.write(imageDataString);
	}
	
});



io.on('connection', function(socket) {
	console.log("New Connection");
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
        
        
        var longAssString = ""
	
		var imageArray = new Array(128);
		
		for(var x = 0; x < imageArray.length; x++){
			imageArray[x] = new Array(128);
		}
		
		for(var x = 0; x < imageArray.length; x++){
			for(var y = 0; y < imageArray[x].length; y++){
				//imageArray[x][y] = Math.round(Math.random());
				imageArray[x][y] = Math.round(Math.random());
			}
		}
		
			for(var x = 0; x < imageArray.length; x++){
			for(var y = 0; y < imageArray[x].length; y++){
				longAssString += imageArray[x][y];
			}
		}
		
		console.log(longAssString.length);
        
        sock.write(longAssString.substring(0, 2047));
        sock.write(longAssString.substring(2048, 4095));
        
        
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
        lovebox_sock = null;
    });
    
}).listen(PORT, HOST);


console.log('Main Server listening on ' + HOST +':'+ PORT);



