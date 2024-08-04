const Admin = require("../../models/admin/admin");
const JWT = require('jsonwebtoken');
require('dotenv').config();

const adminLogin = async(req,res) => {
    try{
        const ifMail = await Admin.findOne({mail : req.body.mail})
        // console.log(ifMail);
        
        if(!ifMail) return res.status(404).json({message : 'invalid mail'});
        
        if(ifMail.password !== req.body.password) return res.status(402).json({message : 'invalid password'});

        //destructuring
        const{password, ...adminData} = ifMail._doc; //actual obj->inside another obj key _doc //It hide password
        //...adminData = it is rest oprt. 
        //password = it is'nt present inside obj(nikal diya isko)

        console.log(adminData);


        JWT.sign({ifMail}, process.env.JWT_KEY, {expiresIn: 60*60*24*7}, (error, token)=>{

            if(error) return res.status(500).json({message : 'error in login'});

            res.status(200).json({message : 'admin logged in successfull', data : adminData, auth: token});
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

module.exports = adminLogin;