const express = require("express");
const users = require("./users.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

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

app.listen(4000, () => {
    console.log("Server is listening at http://localhost:4000");
});

