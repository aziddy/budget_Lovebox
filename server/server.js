var Jimp = require('jimp');
 
// open a file called "lenna.png"
Jimp.read('test.png', (err, image) => {
  if (err) throw err;
  image.resize(128, 64) // resize
  
  image.getBuffer(Jimp.MIME_BMP, cb);
  
   // .quality(60) // set JPEG quality
   // .greyscale() // set greyscale
    //.write('lena-small-bw.png'); // save
});


function cb (err, buffer) {
	// 8 bits or 2 hex
	console.log(buffer[0]);
	console.log(buffer[1]);
	console.log(buffer);
	console.log("yeet");
}

