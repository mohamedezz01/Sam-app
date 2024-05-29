import { usermodel } from "../../../DB/Models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

  ///////////////////////SIGN UP////////////////////////
  export const SignUp=async(req,res,next)=>{
    const{FirstName,LastName,Email,Password,DateOfBirth,Governorate,Phone,ConfirmPassword}=req.body
    const userCheck=await usermodel.findOne({Email})
  
    if(userCheck){
      return res.json({message:'Email is already exist'})
    }
  
    if(ConfirmPassword != Password){
      return res.json({message:'Password not match'})
    }
    const hashedPassword=bcrypt.hashSync(Password,+process.env.SALT_ROUNDS) //+ for parsing
    const records = new usermodel({FirstName,LastName,Email,ConfirmPassword,Password:hashedPassword,DateOfBirth,Governorate,Phone})
    const save_records=await records.save()
    await usermodel.findByIdAndUpdate(save_records._id, {IsOnline: true},{new:true})
    const genToken = jwt.sign({ id:save_records._id, Email:save_records.Email},process.env.TOKEN,{ expiresIn: '24h' })
    // console.log(save_records.Age)
    res.json({message:'Sign Up Successfully',token :genToken})
  }

 ////////////////////////LOGIN////////////////////////
 export const Login=async(req,res,next)=>{
  const{Email,Password}=req.body
  const Emailchecking=await usermodel.findOne({Email})
  if(!Emailchecking){
    return res.json({message:'Invalid Email OR Password'})
  }
  const Passwordchecking =bcrypt.compareSync(Password,Emailchecking.Password)
  if(!Passwordchecking){
    return res.json({message:'Invalid Email OR Password'})
  }
  const genToken = jwt.sign({ id:Emailchecking._id, Email:Emailchecking.Email},process.env.TOKEN,{ expiresIn: '24h' })

  await usermodel.findOneAndUpdate({Email:Emailchecking.Email},{IsOnline:true},{IsDeleted:false},{new:true})
  res.json({message:'Login Successfully',token:genToken})
}

   //////////////////////CHANGE PASSWORD////////////////////////
   export const ChangePassword =async(req,res,next)=>{
    const{Email,Password,newPassword}=req.body
    const Emailchecking=await usermodel.findOne({Email})
    if(!Emailchecking){
      return res.json({message:'Invalid Email OR Password'})
    }
    const Passwordchecking=bcrypt.compareSync(Password,Emailchecking.Password)
    if(!Passwordchecking){
      return res.json({message:'Invalid Email OR Password'})
    }
    const hashhedPassword = bcrypt.hashSync(newPassword, +process.env.SALT_ROUNDS)
    await usermodel.findOneAndUpdate({Email:Emailchecking.Email},{Password:hashhedPassword},{new:true})
    res.json({message:'Password Updated Successfully'})
  }


/////////////////////////////Delete User//////////////////////////
export const DeleteUser = async (req, res, next) => {
  const{Email,Password,ConfirmPassword}=req.body
  const Emailchecking=await usermodel.findOne({Email})
  if(!Emailchecking){
    return res.json({message:'Invalid Email OR Password'})
  }
  const Passwordchecking=bcrypt.compareSync(Password,Emailchecking.Password)
  if(ConfirmPassword != Password){
    return res.json({message:'Password not match'})
  }
  if(!Passwordchecking){
    return res.json({message:'Invalid Email OR Password'})
  }

  const deletion=await usermodel.findOneAndDelete({Email})
  return res.status(200).json({ message: 'Deleted Successfully'})
}

///////////////////////////LOGOUT/////////////////////////to be deleted
export const LogOut=async(req,res,next)=>{
  const{Email,Password}=req.body
  const EmailCheck = await usermodel.findOne({Email})
  if(!EmailCheck){
    res.status(400).json({message : 'Invalid Email OR Password'})
  }
  const PasswordCheck=bcrypt.compareSync(Password,EmailCheck.Password)
  if(!PasswordCheck){
    res.status(400).json({message:'Invalid Email OR password'})
  }
  const logOut=await usermodel.findOneAndUpdate(
    {Email},
    {IsOnline:false},
    {new:true}
  )
  res.status(200).json({message:'Logged Out SuccessFully'})
}

//////////////////////////GET USER INFO////////////////////////
export const GetUserInfo=async(req,res,next)=>{
  const {userID}=req.params
  const userCheck = await usermodel.findById(userID)
  if(!userCheck){
    return res.status(400).json({ message: 'Invalid-User' })
  }
  const UserInfo=await usermodel.findById(userID).select('FirstName LastName Email DateOfBirth Phone Governorate Age')
  return res.status(200).json({ message: 'User Info',UserInfo})
}
//////////////////////////UPDATE USER INFO////////////////////////
export const UpdateInfo=async(req,res,next)=>{
  const{userID}=req.params
  const{FirstName,LastName,DateOfBirth,Phone,Governorate}=req.body
  
  const userExists = await usermodel.findById(userID)
  console.log(userExists);
  if (!userExists) {
    return res.status(400).json({ message: 'in-valid userId' })
  }

  const userIdString = String(userID);

  if (userExists._id.toString() !== userIdString) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  let updatedFields = {};

  if (FirstName) {
    updatedFields.FirstName = FirstName;
    updatedFields.Username = `${FirstName} ${LastName || userExists.LastName}`;
  }

  if (LastName) {
    updatedFields.LastName = LastName;
    updatedFields.Username = `${FirstName || userExists.FirstName} ${LastName}`;
  }

  if (DateOfBirth) {
    updatedFields.DateOfBirth = DateOfBirth;
  }

  if (Phone) {
    updatedFields.Phone = Phone;
  }

  if (Governorate) {
    updatedFields.Governorate = Governorate;
  }

  const newrec = await usermodel.findByIdAndUpdate(
    { _id: userID },
    updatedFields,
    { new: true }
  )
  
  res.status(200).json({ message: 'updated Successfully', newrec })
}