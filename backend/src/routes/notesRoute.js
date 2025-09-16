import express from "express";
import { createANote, deleteANote, getAllNotes, getNoteById, updateANote } from "../controllers/notesCrontroller.js";

const router = express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);

router.post("",createANote);

router.put("/:id",updateANote);

router.delete("/:id", deleteANote);


export default router;

//mongodb+srv://palashmishra47:sgGLX1KM6mc7tZTh@cluster0.xmnchty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 