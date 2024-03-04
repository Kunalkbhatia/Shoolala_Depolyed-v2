const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter your name"], 
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },

    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail , "Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be grater than 8 characters"],
        select:false 
    },
    avatar:{
            type:String,
            default: process.env.DEFAULT_PROFILE_ICON
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt : {
        type: Date,
        default:Date.now()
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }

});
// event listner
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

// JWT Token
// methods of userSchemas
userSchema.methods.getJWTTOKEN = function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE})
    return token;
}


userSchema.methods.comparePassword = async function(enteredPassword){
    const isTrue = await bcrypt.compare(enteredPassword,this.password);
    return isTrue;

}
module.exports = new mongoose.model("User" , userSchema);