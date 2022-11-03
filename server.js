// Start
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

//serve images
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//route to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//route to read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


//route to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {

    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();
//app.delete("/api/notes/:id", (req, res) => {
    
   // const noteId = req.params.id
//})
    //create new property called id based on length and assign it to each json object
    newNote.id = notelength;
    noteList.push(newNote);

    //write the updated data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

//delete note according to their tagged id.
app.delete("/api/notes/:id", (req, res) => {

    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id);
console.log(noteList);
noteList.filter(note => note.id != noteId) 
const updated = noteList.filter(note => note.id != noteId);


    //write the updated data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(updated));
    res.json(updated);
});


//listen to port when deployed
app.listen(PORT, () => console.log("Server running on port " + PORT));