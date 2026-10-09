# CSC337 Advance Web Technologies

## Lecture Overview

- Topic: Express.js Fundamentals — Routing, Middleware, and Handling HTTP Requests

- Duration: 60 Minutes

- Target Audience: Undergraduate Computer Science Students (Prerequisite: Basic Node.js and JavaScript ES6)

- Learning Objectives:

       1. Understand Express.js core architecture and server setup.

       2. Master built-in middleware for static serving and body parsing.

       3. Implement GET and POST routes to handle JSON and HTML files.

       4. Identify limitations of in-memory data structures in production APIs.

### Introduction & Code Overview

**Instructor Script**

```
"Welcome everyone. Today, we are taking a major step beyond raw Node.js by diving into Express.js, the standard web framework for Node.

Imagine building a REST API using Node’s native http module: you would have to manually parse URLs, extract payload chunks from streams, write header routing logic, and write custom static file streamers. Express abstracts all that boilerplate into clean, readable code.

Take a look at the target code on the board. In around 30 lines, this script builds a complete Web Server and REST API that serves an HTML frontend, fetches user records, and adds new users. Let's break it down section by section."
```

- Express.js core benefits: Simplifies routing, body parsing, static file delivery, and middleware management.

- High-level flow of our application:
  $$\text{Client Request} \longrightarrow \text{Middleware Pipeline} \longrightarrow \text{Route Handler} \longrightarrow \text{Response}$$

## Module Imports, Initialization, and Middleware Pipeline

```
  const express = require("express");
  const users = require("./users.js");

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
```

**Key Concepts & Instructor Discussion**

1.  Initialization (const app = express()):
    - Calling express() creates an application instance containing all routing and middleware functionality.

2.  What is Middleware? (app.use()):
    - Middleware functions execute sequentially during the request-response cycle. They have access to the Request object (req), Response object (res), and the next function in the application’s request-response cycle.

3.  Parsing Payload Data:
    - express.json(): Parses incoming HTTP requests with JSON payloads. It populates req.body with a parsed JavaScript object.

    - express.urlencoded({ extended: true }): Parses URL-encoded data from standard HTML <form> submissions. Setting extended: true uses the qs library, which allows for rich objects and arrays to be encoded into the URL-encoded format.

4.  Serving Static Assets (express.static("public")):
    - Serves static assets like CSS, client-side JS, images, or static HTML directly from the /public directory without requiring individual route definitions.

## Routing Mechanics: GET & POST Handlers

```
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname }, err => {
        if (err) throw new Error("Error while reading file");
    })
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.json({ redirect: true, message: "User saved successfully." });
    //res.redirect("/");
});
```

**Key Concepts & Instructor Discussion**

1. Serving HTML Files (app.get("/")):
   - res.sendFile() streams a file directly to the client.

   - Why { root: **dirname }? res.sendFile requires an absolute file path. Node's global variable **dirname guarantees the path resolves accurately regardless of where the script is executed.

   - Error Callback: Passes an optional error parameter to intercept missing file issues or read permission errors.

2. Building a Read Endpoint (app.get("/users")):
   - res.json() serializes JavaScript objects or arrays into JSON format and automatically sets the header Content-Type: application/json.

3. Handling Create Operations (app.post("/users")):
   - Spread Operator (...req.body): Combines object properties dynamically.

   - ID Generation Strategy: id: users.length + 1 creates an incrementing ID. (Point out to students: This strategy breaks if items are deleted from an array!)

   - Redirect vs JSON Response: Note the commented-out res.redirect("/"). Returning JSON lets client-side JS frameworks handle redirection, offering greater flexibility than direct HTTP 302 redirects.

## App Listener & Code Review / Bug Hunt

```
  app.listen(4000, () => {
      console.log("Server is listening at http://localhost:4000");
  });
```

**Interactive Bug Hunt & Code Analysis**
All the students must review the provided code snippet and identify potential real-world runtime bugs or design issues.

1. Unhandled Uncaught Exception in res.sendFile:

   ```
          if (err) throw new Error("Error while reading file");
   ```

   - Issue: Throwing an asynchronous error inside an async callback without passing it to Express's next(err) handler can trigger an uncaught exception, which can crash the entire Node process.

   - Fix: Use if (err) return next(err); instead of throw new Error(...).

1. In-Memory Data Persistence:
   - Issue: Storing data in users.push(user) means all newly registered users are lost whenever the server restarts or crashes.

   - Production Solution: Connect to a persistent database like MongoDB or PostgreSQL.

1. Concurrency & Race Conditions in ID Generation:
   - Issue: users.length + 1 generates duplicate IDs if multiple asynchronous requests come in simultaneously or if array elements are removed.

## Summary & Homework Assignment

- Middleware sits between incoming requests and outgoing responses.

- Express provides helper methods like res.json() and res.sendFile() that streamline HTTP handling.

- Always handle asynchronous file system errors safely using Express error handling, and rely on real database identifiers in production apps.

**Assignment/Lab Exercise**

1. Refactor Error Handling: Update the app.get("/") handler to pass the error to an Express central error handler (next(err)).

2. Implement Input Validation: Add a check inside app.post("/users") to verify that req.body.name and req.body.email exist. If missing, return an HTTP status 400 Bad Request.

3. Add DELETE & PUT Routes: Write two additional endpoints:
   - DELETE /users/:id to remove a user by ID.

   - PUT /users/:id to update an existing user's details.

**Good Bye**
