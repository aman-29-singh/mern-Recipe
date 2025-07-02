import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique: true,
    },
    password: {
        type : String,
        required: true
    }
},{
    timestamps: true
});

//Now we want to write a mongoose middleware function that will run before the document is saved to database
userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password =  await bcrypt.hash(this.password, salt)
    next();
});//this define a pre save hook in mongoose
//so this pre will allow us to execute a logic before the save operation  complete

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model('User', userSchema);

export default User;