const jwt = require('jsonwebtoken')


const authMiddleware = (req, res, next) =>{
    
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token received:", token); // 👈 add this
    if(!token) return res.status(401).json({message: "Unauthorized: No token provided"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user  = decoded;
        next();
    }catch (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

}

module.exports = authMiddleware;