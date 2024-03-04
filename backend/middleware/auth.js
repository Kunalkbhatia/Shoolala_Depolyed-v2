const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("please Login to access this resources",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    req.user = user;
    next();
});

exports.authorizationRoles = (...roles) => {
    return (req , res , next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resources`,403 ));
        };

        next();
    };
};


