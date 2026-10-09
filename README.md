# CSC337 Advance Web Technologies

## Node JS HTTP Server

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
