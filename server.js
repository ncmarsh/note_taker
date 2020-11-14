const express = require("express");
const path = require("path");
const fs = require("fs");
const notesdb = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all notes
app.get("/api/notes/", function(req, res) {
  return res.json(notesdb);
});

// Save new note, add to db and return the new note to the client
// take db.json and convert to an array, then push new note into the array, then take new array and put back to db.json
// fs, stringify, parse
app.post("/api/notes", function(req, res) {
  console.log(req.body);
  res.send(notesdb);
  console.log(notesdb);
  // this is console logging the notesdb, but it's not saving the input from the client side
});

// Default route to home page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
