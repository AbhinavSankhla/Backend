const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    mail : String,
    password : String
});

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;