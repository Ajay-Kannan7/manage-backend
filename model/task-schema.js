let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let taskSchema=new Schema({
    name:{type:String,required:true},
    task:{type:String,required:true}
})

let taskModel=mongoose.model("tasks",taskSchema)

module.exports=taskModel