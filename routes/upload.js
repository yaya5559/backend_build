const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth")

const router = express.Router()

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}}`);
    }
});


const upload = multer({storage})

router.post("/", authMiddleware, upload.single("profileImage"), async(req, res)=>{
    try{
        if(!req.file){
            return res.status(400).json({meessage : "No file uploaded"});
        }

        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        res.status(200).json({imageUrl});


    }catch(error){
        console.error("File upload error:", error);
        res.status(500).json({ message: "Server error while uploading" });
    }
});

module.exports = router;

