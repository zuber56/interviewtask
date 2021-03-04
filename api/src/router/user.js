const express = require('express')
const User =require('../models/user')
const router = new express.Router()
const mongoose = require("mongoose");

//------------------------>
//       data insert
//------------------------>
router.post('/adduser',(req,res)=>{
    try {
        const { fname, lname, email, role } = req.body;
        const users =new User({
            fname,
            lname,
            email,
            role,
        });
        users.save()
        .then((data)=>{
            return res.status(200).json({
                message:"add",
                data:data
            })
        }).catch((e)=>{
            console.log("error:", e);
        })
     
        
    } catch (error) {
        console.log("data ont founds")
    }
})
router.post('/addusdder',async(req,res)=>{
    try {
     const { fname, lname, email, role } = req.body;
        if (!fname || !lname || !email || !role) {
            return res.status(422).json({
                error: "please add all field",
            });
        }
      await User.findOne({ email: email })
            .then((data) => {
             if (data) {
                return res.status(401).json({
                    error: "email address is alerady used",
                });
            }
            else {
                const users =new User({
                    fname,
                    lname,
                    email,
                    role,
                });
               user
                    .save()
                    .then((data) => {
                    return res.status(200).json({
                        message: "user add successfuly",
                        data,
                    });
                })
                 .catch((error) => {
                    console.log("error:", error);
                });
            }
         })
            .catch((error) => {
            console.log("error:", error);
        });
    }
    catch (error) {
        return res.status(401).json({
            error: "somethinmg went wrong",
        });
    }})
//--------------------------->
// update the user only one
//--------------------------->
router.patch('/updateuser/:id', async(req,res)=>{
    
    try {
        const id = req.params.id;
       
        const { fname, lname, email, role } = req.body;
        
        if (!fname || !lname || !email || !role) {
            return res.status(401).json({
                error: "please add all ddddsssfield",
            });
        }
        const updatedata = {
            fname: fname,
            lname: lname,
            email: email,
            role: role,
        };
        User.findByIdAndUpdate(id, { $set: updatedata })
            .then((data) => {
            return res.status(200).json({
                message: "data updated successfuly",
                data
            });
        })
            .catch((error) => {
            console.log("error:", error);
        });
    }
    catch (error) {
        return res.status(400).json({
            erorr: "something went wrong",
        });
    }
})
//--------------------------->
// delete the user only one
//--------------------------->
router.delete('/userdelete/:id', async (req, res) => {
    const id=req.params.id
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})
//--------------------------->
//read the data only one user
//--------------------------->
router.get('/user/:id',async(req,res)=>{
    const _id=req.params.id
   try {
        const user= await User.findById(_id) 
        if(!user){
                     return res.status(404).send()
                 } 
                 res.send(user)  
    } catch (error) {
        res.status().send(error)
    }
})
//--------------------------->
//user Search
//--------------------------->
router.get('/search/:fname',async(req,res)=>{
    try {
        const fname = req.params.fname;
        User.find({ fname: fname })
            .then((data) => {
            return res.status(200).json({
                data,
            });
        })
            .catch((error) => {
            console.log("error:", error);
        });
    }
    catch (error) {
        return res.status(400).json({
            error: "something went wrong",
        });
    }
})


//--------------------------->
//role Search 
//--------------------------->
router.get('/searchrole/:role',async(req,res)=>{
    try {
        const role = req.params.role;
        User.find({ role: role })
            .then((data) => {
            return res.status(200).json({
                data,
            });
        })
            .catch((error) => {
            console.log("error:", error);
        });
    }
    catch (error) {
        return res.status(400).json({
            error: "something went wrong",
        });
    }
})
//--------------------------->
//user Search
//--------------------------->
router.get('/searchdata/:fname',async(req,res)=>{
    try {
        const fname = req.params.fname;
        User.find({ fname: fname })
            .then((data) => {
            return res.status(200).json({
                data,
            });
        })
            .catch((error) => {
            console.log("error:", error);
        });
    }
    catch (error) {
        return res.status(400).json({
            error: "something went wrong",
        });
    }
})


//--------------------------->
//role Search Data 
//--------------------------->
router.get('/searchroledata/:role',async(req,res)=>{
    try {
        const role = req.params.role;
        User.find({ role: role })
            .then((data) => {
            return res.status(200).json({
                data,
            });
        })
            .catch((error) => {
            console.log("error:", error);
        });
    }
    catch (error) {
        return res.status(400).json({
            error: "something went wrong",
        });
    }
})

//--------------------------->
//read all user
//--------------------------->
router.get('/userall',async (req,res)=>{
    try {
        await User.find()
        .then(data=>{
            res.send({
                status:400,
                data
            }) 
        })
    } catch (error) {
        res.send({
            status:404,
            error:error
        })   
    }
})
module.exports = router
