const fs = require("fs");
const uniqid = require("uniqid");
const notesdb = require("../db/db.json");
const { stringify } = require("querystring");

module.exports = function(app) {
    // Displays all notes
    app.get("/api/notes", function(req, res) {
        return res.json(notesdb);
    });
    
    // Saves new note, adds to db and updates the db.json file and the notes list on the browser
    app.post("/api/notes", function(req, res) {
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid()
        };
        console.log(newNote);
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

    // Displays a single note when clicked on
    app.get("/api/notes/:id", function(req, res) {
        let viewThisNote = req.params.id;
      
        console.log(viewThisNote);
      
        for (let i = 0; i < notesdb.length; i++) {
            if (viewThisNote === notesdb[i].id) {
                return res.json(notesdb[i]);
            }
        }
      
        return res.json(false);
    });

    // Deletes a note: read all notes from the db.json file, remove the note with the matching id, and rewrites notes in db.json file
    app.delete("/api/notes/:id", function(req, res) {
        let deleteThisNote = req.params.id;

        console.log(deleteThisNote);

        for (let i = 0; i < notesdb.length; i++) {
            console.log(notesdb[i].id);
            if (deleteThisNote === notesdb[i].id) {
                notesdb.splice(i, 1);
                console.log(notesdb);
                fs.writeFile("./db/db.json", JSON.stringify(notesdb), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was updated!");
                })
            }
        }
        return res.json(false);
    })
}
