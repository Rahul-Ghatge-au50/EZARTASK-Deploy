const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req,res) => {
    try{
        const {username,email,password} = req.body;
        const userExists = await User.findOne({email:email});
        if(userExists) return res.status(400).json({message:"User already exists"})

       const salt = await bcrypt.genSalt(10);
       const hanshPassword = await bcrypt.hash(password,salt);

       const newUser = new User({
        username,email,password:hanshPassword
       });

       const user = await newUser.save();

       const token = await jwt.sign({id:user.id},process.env.JWT_SECRET,{
        expiresIn:'30d'
       });

       res.status(200).json({
        token,
        user:{
            id:user.id,
            username:user.username,
            email:user.email
        }
       });
    }catch(error){
        res.status(500).json({message:"Internal Server error"})
    };
};


const login = async (req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({message:"Invalid user or password"});

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                status: 'fail',
                message:"Password is incorrect"
            })
        };

        const token = await jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:'30d'
           });
    
           res.status(200).json({
            token,
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }
           });
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    };
};

module.exports = {register,login};

