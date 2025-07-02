/*we need a middleware so that by using that we will able to give some kind of access for example
a user can update or delete only a recipe which she/he created by himself but he/she can't update or delete
others people Recipe i.e he/she can only watch others people Recipe so for access control we need to use 
a middleware functions */
import User from "../models/User.js";
import  jwt  from "jsonwebtoken";

export const protect = async (req, res , next)=> {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1];//["Bearer", "ye-token-hai-1- index-mein"] split form mein
        // token variable k andar token hai 1 index ka

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");
        //it finds user using this decoded.id in our database so itt finds user then it attaches user data to this req.user but excluding password

        return next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({message: "Not authorized ,token failed"})
        }
    }
    return res.status(401).json({message: "not authorized token fail"})
};