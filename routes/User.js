const express = require('express');
const User = require('../models/Users'); // Your User model
const authMiddleware = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// be triggered when a client makes A GET request to this path
router.get('/', authMiddleware, async(req, res) =>{
    try{
        console.log("Request User:", req.user); // Debugging
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: "User ID missing from request" });
        }

        
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    }catch (err) {
        res.status(500).json({ message: "Server error" });
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          email: req.body.email,
          profileImage: req.body.profileImage
        },
        { new: true } // This ensures you get the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user); // Send back the updated user data
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;