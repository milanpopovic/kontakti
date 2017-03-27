var http = require('http');                         // Importuj http objekat
fs = require('fs');

// Keširanje statičkih fajlova
var index = fs.readFileSync("index.html","utf8");
var stilovi = fs.readFileSync("kontakti.css","utf8");
var kontaktiJS = fs.readFileSync("kontakti.js","utf8");
var icon = fs.readFileSync("favicon.ico");
var kontakti =[]

fs.readFile("kontakti.dat", function read(err, data) {
    if (err) {
        //throw err;
    }
    else kontakti = JSON.parse(data);
});


function Odgovor(request, response){                // Hendler zahteva
  			// Rutiranje zahteva
        switch(request.url) {
          
          case "/": 
        						response.writeHead(200, {"Content-Type": "text/html"});
                    response.end(index);
                    break;
          case "/kontakti.css":
                    response.writeHead(200, {"Content-Type": "text/css"});
                    response.end(stilovi);
                    break;
          case "/favicon.ico":
                    response.writeHead(200, {'Content-Type': 'image/gif' });
        						response.end(icon, 'binary');
                    break;
          case "/kontakti.js":
										response.writeHead(200, {"Content-Type": "text/plain"});
                    response.end(kontaktiJS);
                    break;
   				case "/novi-kontakt":
                    var sadrzaj = ""
										request.on('data', function (data) {
												sadrzaj += data;
										});
                    request.on('end', function () { 
                        kontakt = JSON.parse(sadrzaj)  
                        kontakti.push(kontakt)
                        response.end(JSON.stringify(kontakti))	
                        fs.writeFile("kontakti.dat", JSON.stringify(kontakti), function(err) {
													if(err) {
															console.log(err);
													}
											  }); 
										});	
                    break;
          case "/prikazi-kontakte":
                        response.end(JSON.stringify(kontakti))
                        break;
          default: break;
				}
	
}
var server = http.createServer(Odgovor);            // Kreiraj server

server.listen(9999, function(){                     // Startovanje servera

  console.log("Čekam zahteve na: http://localhost: ", 9999);

});
