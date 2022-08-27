const express= require('express');
const mongoose =require('mongoose');
require('dotenv/config');

const router = require('./Routers/register')

const app= express();

// supporting request body
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/user',router)

app.use('/',(req,res)=>{
    res.send("Wecome Roys")
})

mongoose.connect(process.env.CONNECTION_URL, (error)=>{
    if(error){
        console.log("Failed to connect Mongodb")
    }
    else{
        console.log('Connection Sucesfull To Mongodb')
    }
})

app.listen(process.env.PORT,(error)=>{
    if(error){
        console.log(" Failed to connect Port")
    }
    else{
        console.log('Connecting to Port Sucesfull')
    }
})





