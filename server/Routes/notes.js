const express = require("express");
const router = express.Router();
const NotesController = require("../Controllers/NotesController");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./files";
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({
    storage: storage
});

// Routes
router.post("/upload", authMiddleware, upload.single("file"), NotesController.uploadNote);
router.get("/getFiles", NotesController.getNote);
router.get("/getFiles/:id", NotesController.getNoteByID);
router.put('/:id', authMiddleware, upload.single('file'), NotesController.updateNote);
router.delete('/:id', authMiddleware, NotesController.deleteNote);
router.get('/user/:id', NotesController.getNotesByUserID);
module.exports = router;