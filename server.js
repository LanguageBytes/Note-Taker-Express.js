// Packages and Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const server = require("http");
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 8080;

// Setting Up Express Server
const app = express()
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// GET Requests
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
      if (err) throw err;
      res.json(JSON.parse(data));
  })
})

// POST Requests
app.post("/api/notes", function (req, res) {
  let createNote = req.body;
  createNote.id = uuidv4();
  fs.readFile("./db/db.json", function (err, data) {
      if (err) throw err;
      let notes = JSON.parse(data);
      notes.push(createNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
          if (err) throw err;
          res.status(200).end();
      })
  })
})

//DELETE Requests
app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
      if (err) throw err;
      const CreateNewArray = JSON.parse(data).filter(note => note.id != req.params.id)
      fs.writeFile("./db/db.json", JSON.stringify(CreateNewArray), function (err) {
          if (err) throw err;
          res.status(200).end();
      })
  })
})

// Start Server
app.listen(port, "0.0.0.0", function() {
  console.log("App listening on PORT " + port);
});
