const fs=require('fs');

var fetchNotes=()=>{
try{
    noteString=fs.readFileSync('note-data.json');
    return JSON.parse(noteString);
}catch(e){
    return [];
}
}

var saveNotes=(notes)=>{
fs.writeFileSync('note-data.json',JSON.stringify(notes));
}


var addNote=(title,body)=>{
 var isCreated=false;
var notes=fetchNotes();
var note={
    title,
    body
};
var duplicateNotes=notes.filter((note)=>note.title===title);
    if(duplicateNotes.length===0){
    notes.push(note);
    saveNotes(notes);
    isCreated=true;
}
return isCreated;
};

var getAll=()=>{
    return fetchNotes();
}
var getNote=(title)=>{
    var note=fetchNotes().filter((note)=>note.title===title)[0];
    return note
}

var removeNote=(title)=>{
    console.log("Removing a note :",title);
    var notes=fetchNotes();
   var filteredNotes= notes.filter((note)=>note.title!==title);
   saveNotes(filteredNotes)
   return filteredNotes!==notes;
}

var logNote=(note)=>{
       console.log(`===\n Title:${note.title}\n Body:${note.body}`)
}

module.exports={
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote

};