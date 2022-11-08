let mongoose=require('mongoose')
let Schema=mongoose.Schema;

let userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,require:true},
    password:{type:String,required:true},
})

let userModel=mongoose.model("users",userSchema);
module.exports=userModel;