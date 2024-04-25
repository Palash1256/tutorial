const mongoose=require("mongoose");
const userSchema= new mongoose.Schema(
    {
        username:String,
        email:String,
        password:String,
        firstName:String,
        lastName:String,
        age:Number
        //hobbies:[String]
    }
);

const User= mongoose.model('Users',userSchema);
module.exports = User;