const path = require("path");
const fs = require("fs");
const notesdb = require("../db/db.json");

module.exports = function(app) {
    // Displays all notes
    app.get("/api/notes/", function(req, res) {
        return res.json(notesdb);
    });
    
    // Save new note, add to db and return the new note to the client
    // take db.json and convert to an array, then push new note into the array, then take new array and put back to db.json
    // fs, stringify, parse
    app.post("/api/notes", function(req, res) {
        console.log(req.body);
        // res.send(notesdb);
        console.log(notesdb);
        let existingNotesArr = JSON.parse(notesdb);
        console.log(existingNotesArr);
    
        fs.readFile("./db/db.json", function(req, res) {
        let newNote = req.body;
        console.log(newNote);
    
    
        })
    
        // let newNote = req.body;
        // console.log(newNote);
        // existingNotesArr.push(newNote);
        // console.log(existingNotesArr);
    });
}
