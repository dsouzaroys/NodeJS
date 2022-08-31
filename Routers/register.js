
const express = require('express');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken')

const userModel = require('../model/usermodel');
const { registerValidation , loginVlidation } = require('../verification/inputValidate');
const auth = require('../middleware/jwtverification');

const router = express.Router();
router.get('/all',auth, async (req, res) => {
    const getvalue = await userModel.find()
    res.json(getvalue);
})

// fetching the data after filtering
router.get('/all/:id', auth,async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) res.status(400).json({ Message: `Uset Id: ${id} is not valid` })

    const getvalue = await userModel.find({ _id: id })
    if (Object.keys(getvalue).length) {
        res.json(getvalue);
    }
    else {
        res.json({
            Message: `No user from ${id}`
        })
    }
})

router.patch('/all/:id',auth, async (req, res) => {
    const id = req.params.id;
    // checking is the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(400).json({ Message: `Uset Id: ${id} is not valid` })
    const updateData = req.body
    
    // check entry is already existe in database
    const getvalue = await userModel.findOne({ _id: id })
    
    if (getvalue) {
        // validating the input
        const { error } = await registerValidation(updateData)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // bcrypting the password
        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(updateData.password, salt)

        const returnData = await userModel.findByIdAndUpdate(id,{
            userName:updateData.userName,
            email:updateData.email,
            password:await bcrypt.hash(updateData.password,10)
        })
        // console.log(returnData);
        res.json(returnData);
    }
    else {
        res.status(400).send(`Uset Id: ${id} is not valid`);
    }

})

router.delete('/all/:id',auth, async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) res.status(400).json({ Message: `Uset Id: ${id} is not valid` })

    const getDeletingvalue = await userModel.findOne({ _id: id })

    if (getDeletingvalue) {
        await userModel.findByIdAndRemove(id)
        res.json({
            Message: "user info deleted sucesfully"
        })

    }
    else {
        res.send("FAilled to Delete data");
    }
})

router.delete('/all',auth, async (req, res) => {
    const Users = await userModel.find()

    if (Users.length) {
        ;
        await userModel.remove()
        res.send("all user info are deleted");
    }
    else {
        res.send("No Users to delete");
    }
})

router.post('/register', async (req, res) => {
    // Adding Element inside a array
    const data = req.body
    const { error } = await registerValidation(data)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    // cecking user already exist
    const userExist = await userModel.findOne({
        email : data.email,
    })
    if(userExist){
        return res.status(400).send("User already Exist")
    }

    // console.log(error.details[0].message)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt)
    const cratUser = new userModel({
        userName: data.userName,
        email: data.email,
        password: hashPassword
    })
    const userInfo = await cratUser.save()
    res.send(userInfo)
})

router.post('/login',async(req,res)=>{

    const data = req.body
    const {error} = await loginVlidation(data)
    if(error){
        return res.status(400).send("Email or Password Invalid")
    }
    // cecking user already exist
    const userExist = await userModel.findOne({
        email : data.email,
    })
    if(!userExist){
        return res.status(400).send("User Does Not Exist")
    }
    const validatePassword = await bcrypt.compare(data.password, userExist.password)

    if(!validatePassword){
        return res.status(400).send("Password Is Not Valid")

        
    }
    // genrating The token to validated user
    const token = jwt.sign({
        id:userExist._id
    },"1234",{ expiresIn: 20 })


    res.header('authToken',token).send(token)

})



module.exports = router