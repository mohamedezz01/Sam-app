import jwt from 'jsonwebtoken'
import { usermodel } from '../../DB/Models/user.model.js'

export const isAuthenticated =()=>{
    return async(req,res,next)=>{
     const {authorization}= req.headers
     if(!authorization){
        return res.status(400).json({message:'Please login first'})
     }
     if(!authorization.startsWith('SAM')){
        return res.status(400).json({message:'Invalid Token prefix'})
     }
     
    const token = authorization.split(' ')[1]
    const decodeddata = jwt.verify(token, process.env.TOKEN)

    if(!decodeddata || !decodeddata.id){
        return res.status(400).json({message:'Invalid Token'})
    }
    const findUser=await usermodel.findById(decodeddata.id) //userID
    if(!findUser || findUser.IsDeleted==true || findUser.IsOnline==false){
        return res.status(400).json({message:'Invalid User'})
    }    
    req.authuser=findUser
    next()
    }
}

