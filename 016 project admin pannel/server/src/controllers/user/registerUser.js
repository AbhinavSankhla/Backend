const User = require("../../models/user/user");
const otpSave = require("../../support/otpdata/otpMap");

const registerUser = async(req,res)=> {
    try{
        console.log(req.body);
        
        const sentOtp = otpSave.get(req.body.email); //key
        // console.log(sentOtp, Number(req.body.otp));

        if(!req.body.otp) return res.status(401).json({message: 'please provoide a otp'});
        if( Number( req.body.otp) !== sentOtp) return res.status(401).json({message: 'please provoide a valid otp'});

        const userdata = new User({
            email: req.body.email,
            password: req.body.password
        });
        
        const response = userdata.save();

        //response._doc used for iteration 
        //...filteredResponse = remove particular response
        //password = name of object key which have to be remove.
        const {password ,...filteredResponse} = response._doc

        res.status(200).json({message : 'user registered successfully', data: filteredResponse});

        otpSave.delete(req.body.email);
    }
    catch(error){
        console.log(error);

        if(error.code === 11000) return res.status(400).json({message: 'user already exists'});
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports= registerUser;