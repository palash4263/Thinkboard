import mongoose from "mongoose";

//Step 1 : you need to create a schema
//Step 2 : then you need to create a model based of that schema

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});

const Note = mongoose.model("Note",notesSchema);

export default Note;