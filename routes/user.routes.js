const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userRouter = express.Router();

userRouter.post("/signup" , async (req,res)=>{
    const {email,password} = req.body;
    try {
        bcrypt.hash(password, 5 , async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }else{
                const user = new UserModel({email,password:hash});
                await user.save();
                res.json({msg:"User Successfully registered" , user});
            }
        })
    } catch (error) {
        res.json({error:error.message})
        
    }
})


userRouter.post("/login" , async (req,res)=>{
    const {email , password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password , async(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id},"masai");
                    res.json({msg:"Logged In" , token})
                }else{
                    res.json({msg:"Wrong Credentials"})
                }
            })
        }else{
            res.json({msg:"User does not exist"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
})


module.exports={
    userRouter
}

