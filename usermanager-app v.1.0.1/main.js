const http = require("node:http");
const fs = require("node:fs");
const users = require("./users.js");
const path = require("path");

const PORT = 4000;



const server = http.createServer((req, res) => {
    // res.write("<h1 style='color: red;'>I am your server, please request me more....</h1>");
    const ext = path.extname(req.url);
    if (ext === ".css" && req.method === "GET") {

        res.writeHead(200, {
            "content-type": "text/css"
        });

        fs.readFile("./styles.css", (err, data) => {
            res.end(data);
        })
    }

    if (req.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            res.write(data);
            res.end();
        })
    }
    //Route http://localhost:4000/users req.url === "/users"
    if (req.url === "/users") {
        res.writeHead(200, {
            "content-type": "application/json"
        });
        //Serialization 
        res.end(JSON.stringify(users));
    }

    //
    if (req.url === "/promotion") {
        res.end("You are promoted....");
    }

});

server.listen(PORT, function () {
    console.log("Server is listening at http://localhost:", PORT);
});