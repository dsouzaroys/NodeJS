
const express= require('express');

const router = express.Router();

const user= [
    {
        id:1001,
        userName:"Roys",
        email:"roys@gmail.com",
        password:"1234"

    },
    {
        id:1002,
        userName:"Royston",
        email:"royston@gmail.com",
        password:"12345"

    }
]
router.get('/all',(req, res)=>{
    res.send(user);
} )

// fetching the data after filtering
router.get('/all/:id',(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    const filteredArray= user.filter((element)=>{
        // console.log(element.id);

        return element.id.toString()===id;

    })
    // console.log(filteredArray)
    // console.log(user);
    res.send(filteredArray);
})

router.patch('/all/:id',(req,res)=>{
    const id =req.params.id;
    const findArray=user.find((element)=>{
        return element.id.toString()===id;
        
    })
        // console.log(findArray);
        // console.log(req.body);
        // console.log("*".repeat(50));
        // console.log(Object.keys(req.body).length);
        // console.log(findArray && Object.keys(req.body).length)
  

    if(findArray && Object.keys(req.body).length){
        const index= user.indexOf(findArray);
        // console.log(index);
        user[index]=req.body
        res.send(user[index]);
    }
    else{
        res.send("FAilled to update data");
    }

})

router.delete('/all/:id',(req,res)=>{
    const id =req.params.id;
    const findArray=user.find((element)=>{
        return element.id.toString()===id;
        
    })
    if(findArray){
        const index= user.indexOf(findArray);
        console.log(index);

        const deletedValue=user.splice(index,1);

        res.send(deletedValue);

    }
    else{
        res.send("FAilled to Delete data");
    }
})

router.delete('/all',(req,res)=>{
    if(user.length){;
        user.splice(0,user.length)
        res.send("all elemnts are deleted");
    }
    else{
        res.send("FAilled to Delete data");
    }
})

router.post('/register',(req,res)=>{
    // Adding Element inside a array
    user.push(req.body)
    res.send(req.body)
})



module.exports =router