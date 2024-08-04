const Admin = require("../../models/admin/admin")
require('dotenv').config();

let ifRegistred = false; //flag to prevent render

const registerAdmin = async() =>{

    if(ifRegistred) return;

    //check whether admin data already inserted or not
    const ifAdmin = await Admin.find();

    //it console user id & passwd whenever server in running; 
    // if(ifAdmin.length!==0) return console.log(ifAdmin[0]);

    let mail = process.env.ADMIN_EMAIL;
    let password = process.env.ADMIN_PASSWORD;
   
    if(!mail || !password) return console.log('please set ADMIN_EMAIL and ADMIN_PASSWORD in .env file');

    const adminData = new Admin({
        mail,
        password
    });

    const response = await adminData.save();
    // console.log(response);
    ifRegistred = true;

    // const Admin  = mongoose.model('admin',adminSchema);

    // console.log(mail,password);
}

module.exports = registerAdmin;