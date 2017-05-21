const fs=require('fs');
const _=require('lodash');
const yargs=require('yargs');

const notes=require('./notes');

var titleOption={
    describe:'title of note',
    demand:true,
    alias:'t'
}
var bodyOption={
    describe:'body of note',
    demand:true,
}

var argv=yargs.command('add','adding a new note',{
title:titleOption,
body:bodyOption
})
.command('list','listing all notes(s)')
.command('read',"reading a note",{
    title:titleOption
})
.command('remote','removing a note',{
    title:titleOption
})
.help()
.argv;

var command=argv._[0];

if(command==='add')
{
    isCreated=notes.addNote(argv.title,argv.body);
    var result=isCreated? console.log("note created!") :console.log("note with same title exist!")
}else if(command==='list')
{
   var allNotes= notes.getAll();
    console.log(`Listing ${allNotes.length} notes(s) `);
    allNotes.forEach((note)=> {
        logNote(note)
    }, this);
   
}else if(command==='read')
{
   note= notes.getNote(argv.title);
   if(note)
   {
       logNote(note);
   }else
   {
       console.log("note was not found")
   }
}else if(command==='remove')
{
    var message=notes.removeNote(argv.title)? "Note was removed" :"Note not found";
    console.log(message);
}else
{
    console.log("command not recognized");
}





