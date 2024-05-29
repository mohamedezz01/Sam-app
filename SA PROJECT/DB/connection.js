import mongoose from "mongoose";
export const Conn=async()=>{
    return await mongoose
    .connect(process.env.DB_CONN_URL)
    .then(()=>console.log("DB connected SuccessFully"))
    .catch((err)=>console.log('DB Connected Failed'))
}