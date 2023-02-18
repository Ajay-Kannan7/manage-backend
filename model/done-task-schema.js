let mongoose=require("mongoose")
let Schema=mongoose.Schema;

let DoneTaskSchema=new Schema({
    name:{type:String,required:true},
    task:{type:String,required:true}
})

let DoneTaskModel=mongoose.model("done",DoneTaskSchema)

module.exports=DoneTaskModel;