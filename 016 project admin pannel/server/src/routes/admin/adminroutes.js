const express = require('express');
const { adminLogin } = require('../../controllers/controller');

const adminRoutes = express.Router();

// adminRoutes.get('/check', (req,res)=> {
//     res.send('hello');
// });

// adminRoutes.post('/getData',(req,res) => {
//     const data = req.body;
//     console.log(data);
//     res.send('hello');
// })

adminRoutes.post('/login', adminLogin)


module.exports = adminRoutes;