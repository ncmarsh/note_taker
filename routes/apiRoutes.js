const path = require("path");
const fs = require("fs");
const notesdb = require("../db/db.json");
const { stringify } = require("querystring");

module.exports = function(app) {
    // Displays all notes
    app.get("/api/notes", function(req, res) {
        return res.json(notesdb);
    });
    
    // Saves new note, adds to db and updates the db.json file and the notes list on the browser
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        console.log(newNote);
        console.log(notesdb);
        notesdb.push(newNote);
        console.log(notesdb);
    
        fs.writeFile("./db/db.json", JSON.stringify(notesdb), function(err) {
            if(err) {
                return console.log(err);
            }
            res.json(newNote);
            console.log("The file was updated!");
        })
    });
}
