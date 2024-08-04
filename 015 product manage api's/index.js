const express = require('express');
const allRoutes = require('./src/app');
const envs = require('dotenv').config()  

// envs.config() //use to get file from .env directory

//initialization
const app = express();

app.use(express.json());
app.use(allRoutes);

//server //app listen from port
app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`)
})



