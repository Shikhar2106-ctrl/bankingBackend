const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')
const emailService= require('../services/email.service')

/**
 * 
 * - user register controller
 * -POST /api/auth/register
*/

exports.register= async (req, res)=>{
    try{
        const {email, name, password}= req.body
        if(!email || !name || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        const existsUser= await userModel.findOne({email:email})
        if( existsUser){
            return res.status(422).json({message: "User already exists"})
        }
        const user= await userModel.create({email, name, password})
        const token= jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'})
        res.cookie('token', token)
        res.status(201).json({message: "User registered successfully", user:{_id: user._id, name: user.name, email: user.email}})
        await emailService.sendRegistrationEmail(user)
    }catch(error){
        return res.status(500).json({message: "Internal server error", error})
    }
    
}

/**
 * 
 * - user login controller
 * -POST /api/auth/login
*/

exports.login= async (req, res)=>{
    try{
        const {email, password}= req.body
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        const user= await userModel.findOne({email: email}).select('+password')
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const isMatch= await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({message: "Email or Password is invalid"})
        }
        const token= jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'})
        res.cookie('token', token)
        return res.status(200).json({message: "Login successful", user:{_id: user._id, name: user.name, email: user.email}})
    }catch(error){
        return res.status(500).json({message: "Internal server error", error})
    }
}