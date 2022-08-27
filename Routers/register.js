
const express= require('express');
const { default: mongoose } = require('mongoose');
const { object } = require('webidl-conversions');
const userModel = require('../model/usermodel');

const router = express.Router();

router.get('/all',async(req, res)=>{
    const getvalue= await userModel.find()
    res.json(getvalue);
} )

// fetching the data after filtering
router.get('/all/:id',async(req,res)=>{
    const id=req.params.id;
    
    if( !mongoose.Types.ObjectId.isValid(id)) res.status(400).json({ Message:`Uset Id: ${id} is not valid`})

    const getvalue= await userModel.find({_id:id})
    if(Object.keys(getvalue).length){
        res.json(getvalue);
    }
   else {
        res.json({
            Message:`No user from ${id}` 
        })
    }
})

router.patch('/all/:id',async(req,res)=>{
    const id =req.params.id;
    
    if( !mongoose.Types.ObjectId.isValid(id)) res.status(400).json({ Message:`Uset Id: ${id} is not valid`})

    const getvalue= await userModel.findOne({_id:id})


    if(getvalue && Object.keys(req.body).length){
        await userModel.findByIdAndUpdate(id,req.body)
        res.json(req.body);
    }
    else{
        res.send("FAilled to update data");
    }

})

router.delete('/all/:id',async(req,res)=>{
    const id =req.params.id;

    if( !mongoose.Types.ObjectId.isValid(id)) res.status(400).json({ Message:`Uset Id: ${id} is not valid`})

    const getDeletingvalue= await userModel.findOne({_id:id})
   
    if(getDeletingvalue){
        await userModel.findByIdAndRemove(id)
        res.json({
            Message : "user info deleted sucesfully"
        })

    }
    else{
        res.send("FAilled to Delete data");
    }
})

router.delete('/all',async(req,res)=>{
    const Users= await userModel.find()

    if(Users.length){;
        await userModel.remove()
        res.send("all user info are deleted");
    }
    else{
        res.send("No Users to delete");
    }
})

router.post('/register',async(req,res)=>{
    // Adding Element inside a array
    const cratUser=new userModel(req.body)
    await cratUser.save()
    res.send(req.body)
})



module.exports =router