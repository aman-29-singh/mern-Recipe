import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';
const router = express.Router();

//Register a user
router.post("/register", async(req, res)=>{
    const {username, email, password} = req.body;

    try{
        if(!username || !email || !password) {
            return res.status(400).json({message: "please fill all fields"})
        }

        //user provide all this fields then we want know that this kind of user already exists in our databases
        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        //if this user doesn't exists yet it means we can create that user
        const user = await User.create({username, email, password})
        const token = generateToken(user._id);//function call niche se when user Register i.e sign up
        
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            })
        
    }catch(error){
        res.status(500).json({ message: "server error"})
    }
})

//route for login
router.post('/login', async (req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        // we will check user already exists in database or not
        if(!user || !(await user.matchPassword(password))){//if password provided by user doesn't match with a password which is inside of our database
            return res.status(401).json({message: "Invalid credentials"})
        }
        const token = generateToken(user._id);//function call niche se


        //if everything is fine so user can login and we just show him(user) his data
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email, 
            token,         
        })
    } catch(error){
        res.status(500).json({ message: "Server error"})
    }
});

router.get('/me', protect, async (req, res) =>{
    res.status(200).json(req.user);
})



//create a function to Generate jsonwebtoken
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
}

export default router;