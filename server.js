// Packages and Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const server = require("http");
const port = process.env.PORT || 8080;

// Setting Up Server
const app = express()
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// GET Requests
app.get("public/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes"));
});

app.get("/api/notes", (req, res) => {
res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
  
// POST Requests

app.get("/api/notes", function(req, res) {
  readFileAsync("./db/db.json", "utf8").then(function(data) {
      notes = [].concat(JSON.parse(data))
      res.json(notes);
    })
}); 

app.post("/api/notes", (req, res) => {
  let Note = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteSize = (noteList.length).toString();
  Note.id = noteSize;
  noteList.push(Note);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
})

app.listen(port, "0.0.0.0", function() {
  console.log("App listening on PORT " + port);
});
