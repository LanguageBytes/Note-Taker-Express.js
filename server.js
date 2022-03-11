// Packages and Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const port = 3000;


const app = express()
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello')
  });
  
  app.listen(port, () => {
    console.log(`listening on port ${port}!`)
  });