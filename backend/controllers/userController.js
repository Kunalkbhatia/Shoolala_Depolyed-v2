const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async(req,res,next) => {
    const {email , name , password , avatar} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar,
    });
    sendToken(user,201,res);
});

exports.loginUser = catchAsyncErrors(async(req,res,next) => {
    const{email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password" , 401));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
});


exports.logout = catchAsyncErrors(async(req,res,next) => {

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
})


// Get user details 
exports.getUserDetails = catchAsyncErrors(async(req , res , next) => {
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    res.status(200).json({
        success:true,
        user
    });
});


// Update user password 
exports.updatePassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect",401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched",400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
});


// Update user Profile 
exports.updateProfile = catchAsyncErrors(async(req,res,next) => {
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        avatar:req.body.avatar
    }

    const user = await User.findByIdAndUpdate(req.user.id , newUserData , {
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });
});





// --------------------------------Admin Roles---------------------------------





// Get all users (admin)
exports.getAllUsers = catchAsyncErrors(async(req , res , next) => {
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    });
});



// Get single user details (admin)
exports.getSingleUser = catchAsyncErrors(async(req , res , next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does'nt exist with Id: ${req.params.id} `,401));
    }
    res.status(200).json({
        success:true,
        user
    });
});


// Update user Role (Admin)
exports.updateUserRole = catchAsyncErrors(async(req,res,next) => {
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    // We will add cloudianry later 
    const user = await User.findByIdAndUpdate(req.params.id , newUserData , {
        new:true,
        runValidators:true,
        userFindAndModify:false,
    });

    res.status(200).json({
        success:true
    });
});

// Delete admin (Admin)
exports.deleteUser = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does'nt exist with Id: ${req.params.id} `,401));
    }

    await user.deleteOne();

    res.status(200).json({
        success:true
    });
});








// forget password feature pending