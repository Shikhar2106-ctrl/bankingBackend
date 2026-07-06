const userModel= require('../models/user.model')
const jwt= require('jsonwebtoken')

const authMiddleware= async (req, res, next)=>{
    try {
        const token= req.cookies.token || req.header('Authorization')?.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Unauthorized'})
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const user= await userModel.findById(decoded.id)
        if(!user){
            return res.status(401).json({message: 'Unauthorized not found'})
        }
        req.user= user
        return next()
    }
    catch(err){
        console.error(err)
        return res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports= {authMiddleware}