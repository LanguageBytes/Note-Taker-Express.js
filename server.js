// Packages and Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const port = 3002;

// Setting Up Server
const app = express()
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// GET Requests
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
  
app.get('/api/notes', (req, res) => {
    res.send('')
  });

app.get('*', (req, res) => {
    res.send('')
  });

  
// POST Requests


  app.listen(port, () =>
  console.log(`Server listening at: http://localhost:${port}!`)
);
