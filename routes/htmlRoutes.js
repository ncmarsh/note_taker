const path = require("path");

// HTML routes
module.exports = function(app) {
    // Route to notes page
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Default route to home page
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}

