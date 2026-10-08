const http = require("node:http");
const fs = require("node:fs");
const path = require("path");

const PORT = 4000;

const users = [
    { id: 1, name: "sara", email: "sara@gmail.com" },
    { id: 2, name: "lara", email: "lara@gmail.com" },
    { id: 3, name: "kara", email: "kara@gmail.com" },
    { id: 4, name: "pooja", email: "pooja@gmail.com" },
    { id: 5, name: "wilma", email: "wilma@gmail.com" },
    { id: 6, name: "salma", email: "salma@gmail.com" },
    { id: 7, name: "gulsen", email: "gulsen@gmail.com" }
];


const server = http.createServer((req, res) => {
    // res.write("<h1 style='color: red;'>I am your server, please request me more....</h1>");
    const ext = path.extname(req.url);
    //Route
    if (ext === ".css" && req.method === "GET") {

        res.writeHead(200, {
            "content-type": "text/css"
        });

        fs.readFile("./styles.css", (err, data) => {
            res.end(data);
        })
    }

    //Route
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

    //Route
    if (req.url === "/promotion") {
        res.end("You are promoted....");
    }

});

server.listen(PORT, function () {
    console.log("Server is listening at http://localhost:", PORT);
});