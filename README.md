# CSC337 Advance Web Technologies

## Overview

From a full-stack development perspective, the usermanager application code illustrates the core mechanics of how a back-end web server acts as the central bridge between a client (the browser) and server-side resources. By building the HTTP server from scratch using Node.js's native http, fs, and path modules without relying on abstractions like Express.js, it demonstrates foundational concepts such as port binding, incoming request listening, and basic routing using URL strings and HTTP methods. It highlights how servers serve static user interface assets (delivering index.html and styles.css with appropriate MIME types so the browser can correctly render the application) alongside dynamic REST API endpoints (serializing in-memory JavaScript data structures into JSON strings via JSON.stringify() to respond to /users). Mastering this low-level request-response lifecycle—handling asynchronous file reading, setting headers, and returning structured data—builds the fundamental understanding required to architecture modern API services, work with databases, and integrate back-end data into dynamic front-end frameworks like React or Vue.

# Fundamentals of Web Servers in Node JS

## Module 1: Core Modules & Initial Setup

Key Concept: Node.js Built-in Core Modules
Node.js comes with built-in utility modules that don't require npm install.

```
       const http = require("node:http");
       const fs = require("node:fs");
       const path = require("path");
```

- node:http: Provides functionality to create HTTP servers and client requests. The node: prefix is modern Node.js syntax denoting standard built-in modules.

- node:fs: Allows interaction with the file system (reading, writing, and streaming files).

- path: Provides utilities for working with file and directory paths across different operating systems (Windows \ vs. POSIX /).

## Module 2: The Server Lifecycle & Port Binding

```
       const PORT = 4000;

       const server = http.createServer((req, res) => {
              // Request-Response Handler Logic
       });

       server.listen(PORT, function () {
              console.log("Server is listening at http://localhost:", PORT);
       });
```

### Explaining the Mechanics:

1. http.createServer(callback):
   - Creates an instance of http.Server.

   - The callback function executes every single time an HTTP request hits the server.

   - req (http.IncomingMessage): Contains data about the incoming request (URL, headers, HTTP method).

   - res (http.ServerResponse): Used to construct and send the response back to the browser.

2. server.listen(PORT):
   - Binds the process to port 4000 and starts listening for incoming TCP network requests.

## Module 3: Routing, Headers, & Data Serialization

1. Static File Serving (CSS & HTML)
   To render web pages properly, a server must inspect the request and respond with the correct Content-Type headers.

```
       const ext = path.extname(req.url);

       if (ext === ".css" && req.method === "GET") {
              res.writeHead(200, {
                     "content-type": "text/css"
              });

              fs.readFile("./styles.css", (err, data) => {
                     res.end(data);
              });
       }
```

- Content-Type Header: Teaches browsers how to interpret received bytes (e.g., as CSS code vs. raw plain text).

- fs.readFile: Asynchronously reads the file contents into memory and returns a Buffer, which is sent via res.end(data).

```
       if (req.url === "/") {
              fs.readFile("./index.html", (err, data) => {
                     res.write(data);
                     res.end();
              });
       }
```

- res.write() vs res.end(): res.write() streams chunk(s) of data to the response body, while res.end() signals to the client that all response headers and body data have been sent.

2. Building REST API Endpoints & Serialization

```
       if (req.url === "/users") {
              res.writeHead(200, {
                     "content-type": "application/json"
              });
              // Serialization
              res.end(JSON.stringify(users));
       }
```

- Serialization: Memory objects in JavaScript (like users) cannot travel directly over network wires. They must be serialized into a text format (JSON strings) via JSON.stringify().

- MIME Type application/json: Informs frontend applications (like React or fetch) to automatically parse incoming responses as JSON data.

## Module 4: Code Review & Best Practices

When reviewing raw Node.js HTTP servers, identifying potential bugs and edge cases is essential:

1. The Missing return Bug
   Issue: Node.js execution does not stop after fs.readFile() or res.end(). If multiple if conditions match or continue executing, headers might be sent twice, crashing the process with an ERR_HTTP_HEADERS_SENT error.

Fix: Add return statements inside route blocks:

```
       if (req.url === "/users") {
              res.writeHead(200, { "content-type": "application/json" });
              return res.end(JSON.stringify(users));
       }
```

2. Error Handling in Asynchronous I/O
   Issue: If ./styles.css or ./index.html fails to load (e.g., missing file), err is ignored, causing the request to hang indefinitely.

Fix: Check for errors inside file system callbacks:

```
       fs.readFile("./index.html", (err, data) => {
              if (err) {
                     res.writeHead(500, { "content-type": "text/plain" });
                     return res.end("Internal Server Error");
              }
              res.writeHead(200, { "content-type": "text/html" });
              res.end(data);
       });
```

## Module 5: Interactive Exercises

Students must complete one of the following tasks:

1. Dynamic Parameter Search: Modify the /users endpoint so that requesting /users?id=1 returns only the user object with id: 1.

2. 404 Catch-All Route: Implement a fallback if block at the bottom of the handler to serve a 404 Not Found HTTP status code when an unknown route is accessed.

## Key Takeaways

- Raw Node.js provides full low-level control over network protocols without needing third-party libraries.

- Always set appropriate HTTP response headers (Content-Type, status codes).

- Serialize complex in-memory data structures using JSON.stringify() before sending them over the network.

- Always implement error callbacks when reading from the file system.
