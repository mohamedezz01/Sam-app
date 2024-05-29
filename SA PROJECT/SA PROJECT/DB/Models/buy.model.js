// import mongoose , { Schema } from 'mongoose'

// const Buyschema=new Schema(
//    {
//     Square_Meter:{
//         type:Number,
//         required:true,
//     },
//     Age_of_house:{
//         type:Number,
//         required:true
//     },
//     Total_rooms:{
//         type:Number,
//         required:true
//     },
//     Total_Bath:{
//         type:Number,
//         required:true
//     },  
//     Floor:{
//         type:Number,
//         required:true
//     },
//     City:{
//         type:String,
//         enum:['Helwan','El_Zamalek','Shobra','El_Maadi'],
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//    } ,
//    {
//     timestamps:true
//    }
// )
// export const buymodel=mongoose.model('Buy',Buyschema)