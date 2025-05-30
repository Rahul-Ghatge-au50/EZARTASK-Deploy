const jwt = require('jsonwebtoken');

const authMiddleware =  (req,res,next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({message:"Not authorized"});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(error){
        res.status(401).json({message:"Not authorized"})
    }
};


module.exports = authMiddleware;