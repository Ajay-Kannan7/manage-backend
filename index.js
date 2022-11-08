let express=require('express');
let cors=require('cors');
let mongoose=require('mongoose');
let app=express();
let userModel=require("./model/user-schema")
let taskModel=require("./model/task-schema")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
let PORT=9000

let dbURL="mongodb+srv://default-user:default123@firstevercluster.jsitxrg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURL)
.then(()=>{
    console.log("Database connected!")
})
.catch(err=>{
    console.log(err);
})

app.post("/register",(req,res)=>{
    let {name,email,password}=req.body;

    userModel.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User account already exists!"})
        }
        else{
            let userReg=new userModel({
                name,
                email,
                password,
                tasks:[]
            })
            userReg.save()
            .then(()=>{
                res.send({message:"User's registered"})
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

app.post("/login",(req,res)=>{
    let {email,password}=req.body;
    userModel.findOne({email:email},(err,user)=>{
        if(user){
            if(user.password===password){
                let userName=user.name
                res.send({message:"Login successful!",userName})
            }
            else{
                res.send({message:"Wrong credentials!"})
            }
        }
        else{
            res.send({message:"Wrong credentials!"})
        }
    })
})

app.post("/add-task",(req,res)=>{
    let name=req.body.userName;
    let task=req.body.formValues.task;
    if(task===""){
        res.send({message:"Task field can't be empty"})
        return;
    }
    let newTask=new taskModel({
        name,
        task
    })
    newTask.save()
    .then(()=>res.send({message:"Task added successfully!"}))
    .catch(err=>console.log(err))
})

app.post("/delete-task",(req,res)=>{
    let content=req.body.content
    taskModel.findOneAndDelete({task:content},(err,user)=>{
        if(user){
            res.send({message:"Task completed!"})
        }
        else{
            console.log(err)
        }
    })
})

app.post("/",(req,res)=>{
    let userName=req.body.userName;
    taskModel.find({name:userName},(err,user)=>{
        if(user){
            res.send({allData:user})
        }
        else{
            console.log(err)
        }
    })
})

app.listen(process.env.PORT||PORT)