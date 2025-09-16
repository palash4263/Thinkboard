import Note from "../models/Note.js";

export async function getAllNotes (req,res ){
   try {
       const notes = await Note.find().sort({createdAt:-1});//new's first
       res.status(200).json(notes);
   } catch (error) {
      console.error("Error in getAllNotes controller",error);
      res.status(500).json({message:"Internal Server error"})
   }
}
 
export async function getNoteById(req,res) {
   try {
      const notesByID = await Note.findById(req.params.id);
      if(!notesByID) return res.status(404).json({message:"Note not found"})
      res.status(201).json(notesByID);
   } catch (error) {
      console.error("Error in getNoteById controller",error);
      res.status(500).json({message:"Internal Server error"})
   }
}

export async function createANote(req, res) {
  try {
    const { title, content } = req.body ?? {};

    // 1) Guard against missing/empty values
    if (!title || !title.trim() || !content || !content.trim()) {
      return res.status(400).json({
        message: "Both 'title' and 'content' are required and cannot be empty.",
      });
    }

    // 2) Create & save
    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
    });

    return res.status(201).json(note);
  } catch (error) {
    // 3) If Mongoose throws a validation error, return 400 (bad request)
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        details: Object.fromEntries(
          Object.entries(error.errors).map(([k, v]) => [k, v.message])
        ),
      });
    }

    console.error("Error in createANote controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateANote (req,res) {
   try {
      const {title,content} = req.body;
      const updatedNote =  await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
      if(!updatedNote) return res.status(404).json({message:"Note not found"})
      res.status(200).json(updatedNote);
   } catch (error) {
      console.error("Error in updateANote controller",error);
      res.status(500).json({message:"Internal Server error"})
   }
   
}

export async function deleteANote (req,res) {
   try {
           const {title,content} = req.body;
           const deleteNote = await Note.findByIdAndDelete(req.params.id,{title,content},{new:true})
            if(!deleteNote) return res.status(404).json({message:"Note not found"})
      res.status(200).json(deleteNote);
   } catch (error) {
        console.error("Error in deleteANote controller",error);
      res.status(500).json({message:"Internal Server error"})
   }
   res.status(200).json({message:"You just deleted a note successfully!"});
}