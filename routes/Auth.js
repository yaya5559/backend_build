const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Import User model
const router = express.Router();





router.post('/register', async (req, res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({error: 'All Feilds are required'})
    }

    

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:'Email already registered'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password, salt);
        const user = new User({username, email, password:hashedPassword});
        await user.save();
        res.json({message: 'User registered successfully'});
        
    }catch(err){
        res.status(400).json({error: 'Error registering user'});    
    }
})

router.post('/login', async(req, res)=>{
    


    const {email, password} = req.body;
    const user = await User.findOne({email})
    

    if(!user) return res.status(400).json({error: 'User not found'});

    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword)
    if(!validPassword) return res.status(400).json({error:'Invalid password'});

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({token, username: user.username, score: user.score})



});

module.exports = router;