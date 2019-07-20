const express=require('express');
const mongoose = require('mongoose')
//const User2=require('../utils/User')
const User2=require('../utils/User')
const User=require('../models/userSchema')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cors=require('cors')
//const auth=require('./db/models/auth')
//const trialUser=require('./TrialUser')
 const app=express();

 
 const port=process.env.PORT || 3000;
 app.use(express.json());
 app.use(cors())

 mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log('connected to DB')).catch(err => console.log(err))

//     const name=req.body.name
//     const age=req.body.age
//     const email=req.body.email
//     const password=req.body.password
//     if(User2.findUserByEmail({email})){
//         userdata={
//             name:name,
//             age:age,
//             email:email,
//             password:password
//         }
//         console.log('Well done, registered')
//         mongoose.save(userdata);
//     }
//     else{
//         console.log(e);

//     }


     

//  })
app.post('/register', async (req,res) => {
    console.log('hello')
    const user=new User(req.body);
    if(req.body.adminCode ==='keshav1234'){
        console.log('yaay admin');
        user.isadmin=true;

    }
    console.log(user.isadmin)
    const temp = await User2.findUserByEmail(user.email)
   if(temp){
       const token = jwt.sign({
           email: user.email,
           userId: user._id
        },
        "hello1234",
        {
            expiresIn:"1h"
        })
        console.log("Token", token)
        // return res.status(200).json(resp)

        await user.save().then(()=>{
             res.status(200).json({
                name:user,
                status:1,
                message:"employee registered",
                token:token
          })
        }).catch(()=>{
            res.status(401).json({
                status:'0',
                message:'email id has already been used'
            })
        })
    }
})

    
    
    // else{
    //     res.status(401).json({
    //         status:'0',
    //         message:'email id has already been used'
    //     })



    

       

// .catch((e)=>{
//        res.status(400);
//        res.send(e);
//    })
   

 app.post('/login', (req,res) => {
    //console.log(user)
    
    var email = req.body.email;
    //console.log(email)
    User2.findUserByEmail(email).then( user => {
        console.log({user})
        
        if(!user){
            
            
        return res.status(401).json({
            status:'0',
            message:'Auth failed'
        })
        }
        console.log(user.password)
        bcrypt.compare(req.body.password, user.password, (err, result)=>{
            if(err){

                
                return res.status(401).json({
                status:'0',
                message:'Auth failed'
                })
            }

            else if(result){
                //console.log(result);
                const token = jwt.sign({
                email: user.email,
                userId: user._id
                },
                "secretKey",
                {
                expiresIn:"1h"
                })
                console.log(token)
                
                return res.status(200).json({

                name:user,
                status:'1',
                message:'Auth Successful',
                token: token
                
                })
            
            }
            else{
                return res.status(401).json({
                status:'0',
                message:'Auth failed'
                })
            }
            })
            // res.send(user);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
            error:err
            })
        })
    })
//      try{
    

//         const user = await User.findByCredentials(req.body.email, req.body.password)
      
//         const token = jwt.sign({
//             email: user.email,
//             userId: user._id
//             },
//             "secretKey",
//             {
//             expiresIn:"1h"
//             })
//             res.send(user,token);

        
//      }
       

//        catch(e){
//            console.log(e);
           
//            res.status(400).send();
//        }
//     }
//  )


 app.get('/users', (req, res) => {
     console.log('in users')
    User.find({}).then((user) => {
   // if (!user) {
    //return res.status(404).send()
    //}
    console.log(user)
    res.send(user)
    }).catch((e) => {
    res.status(500).send()
    })
   })
   
   


app.patch('/users/:id',async(req,res)=>{
    const updates= Object.keys(req.body);
    const allowedUpdates={name,age};
    //const isValidoperation=updates.every((updates)=>allowedUpdates.includes(updates));
    const user=await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true});
    res.send(user);
})
app.get('/users/:id', (req, res) => {
    const _id = req.params.id // Access the id provided
    User.findById(_id).then((user) => {
    if (!user) {
    return res.status(404).send()
    }
    res.send(user)
    }).catch((e) => {
    res.status(500).send()
    })
   })

   
//  app.post('/users',(req,res)=>{
//      const user=new User(req.body);
//      user.save().then(()=>{
//          res.send(user);


//      }).catch((e)=>{
//          res.status(400);
//          res.send(e);
//      })
        
     
         
    
     

     



 app.listen(port,()=>{
     
     console.log('server is on port'+port);
 })
//})