import mongoose , { Schema } from 'mongoose'

const userSchema = new Schema(
{
  FirstName:{
    type:String,
    required:true
  },
  LastName:{
    type:String,
    required:true
  },
  Username:{
    type:String,
    // required:true,
    lowercase:true,
    //Concating First and Last Name
    default: function(){
      return (this.FirstName + this.LastName).toLowerCase()  
    }
  },
  Email:{
    type:String,
    required:true,
    unique:true
  },
  Password:{
    type:String,
    required:true,
  },
  DateOfBirth: {
    type: String,
    required: true,
    set: function(value) {
      // Convert user-entered date in 'YYYY-MM-DD' format to ISO 8601 format 'YYYY-MM-DD'
      if (typeof value === 'string' && value.match(/\d{4}-\d{2}-\d{2}/)) {
        return new Date(value);
      }
      return value;
    }
  },
  
  Age: {
    type: Number,
    get: function() {    //virtual property so not accessed in DB
      // Calculate age based on the DateOfBirth without subtracting 1 day
      const birthDate = new Date(this.DateOfBirth);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear()
      const monthDiff = currentDate.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() <= birthDate.getDate())) {
        age--
      }
      return age;
    }},
  Governorate:{
    type:String,
    required:true
  },
  Phone:{
    type:String,
    required:true
  },
  IsOnline:{
    type:Boolean,
    default:false
  },
  IsDeleted:{
    type:Boolean,
    default:false
  }
},
   {
    timestamps:true
   }
);

export const usermodel = mongoose.model('User',userSchema)