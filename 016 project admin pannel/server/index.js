const express = require('express');
const allRoutes = require('./src/app');
const envs = require('dotenv').config();
const cors = require('cors');  
const path = require('path');
const {registerAdmin} = require('./src/controllers/controller'); 

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

app.use(allRoutes);

registerAdmin();

app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`)
})