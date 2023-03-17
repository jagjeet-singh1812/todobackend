const express = require("express");
const moongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const port=process.env.PORT|| 1337;


const start=async()=>{
  mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    app.listen(port,()=>{
      console.log(`server started listening on port ${port}`)
  })  
}



const todo=require('./models/todo');
app.get('/todos',async(req,res)=>{
  const todos=await todo.find();
  res.send(todos);
  console.log(todos);
})


app.post('/todo/new',async(req,res,next)=>{
  const task=new todo({
    text : req.body.text
  })
  task.save();
  console.log(task);
  res.json(task);
})

app.delete('/todo/delete/:id',async(req,res)=>{
  const reqd_task=await todo.findByIdAndDelete(req.params.id);
  console.log(reqd_task);
  res.json(reqd_task);
})

app.put('/todo/complete/:id',async(req,res)=>{
  const result=await todo.findById(req.params.id);
  result.completed=!result.completed;
  result.save();
  res.json(result);
})


start();