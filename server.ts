import http from 'http'; // ES6 version - import the http module
                         // PRE-BUNDLED
import fs from 'fs';
import mime from 'mime-types'; // 3rd-party module
let lookup = mime.lookup; // Alias for mime.lookup

const hostname:string = 'localhost'; // Local host
const port: number = 3000;            // Testing port
// const port = process.env.PORT || 3000; // if environment is not part of server give port 3000 anyway

// Creating an instance of a server (Immutable)
// Making a server object
// req object - anything sent to server, url
// res object - what the server responds with to yr request 
const server = http.createServer((req, res) => 
{
    let parsedURL = new URL(req.url as string, "http://"+ hostname + ":" + port);
    let path = parsedURL.pathname.replace(/^\/+|\/+/g, "");
    
    console.log(__dirname);
    console.log(req);

    if(path == "")
    {
        path = "index.html";
    }

    
    let file = __dirname + "\\" + path;

    console.log(path);

    fs.readFile(__dirname + path, function(err, data)
    {
        if (err) // If an error throw a 404
        {
            res.writeHead(404);
            res.end("ERROR: 404 - File Not Found!" + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff"); // Security guard
        let mime_type = lookup(path) as string;    // mime-type returns string
        res.writeHead(200, {'Content-Type': mime_type});    // fix up matching different mime types to inject stuff
        res.end(data);
    });
});

// Server starts listening here for user requests ("user req on a port") 
// Similar to addEventListener
server.listen(port, () => {
    console.log(`Sever running at http://${hostname}:${port}/`);
});
