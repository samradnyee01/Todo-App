require('dotenv').config()
const express=require("express");
const jwt=require("jsonwebtoken");
const { createTodo, updateTodo, loginSchema } = require("./types");
const {todos, users} = require("./db");
const cors= require("cors");
const authmiddleware = require("./middleware");
const { JWT_SECRET } = require("./config");
const app=express();
app.use(express.json());
app.use(cors());



app.post("/signin",async (req,res)=>{
    const object=req.body;
    const parseobj=loginSchema.safeParse(object);
    if(!parseobj.success){
        res.status(404).json({
            msg:"wrong inputs"
        });
        return;
    }
    const user=await users.find({
        username:object.username,
        password:object.password
    });
    if(user){
        const username=object.username;
        const token=jwt.sign({username},JWT_SECRET);
        res.json({token});
    }else{
        res.json({
            msg:"Wrong id and password"
        })
    }
});
app.post("/signup",async (req,res)=>{
    const object=req.body;
    const parseobj=loginSchema.safeParse(object);
    if(!parseobj.success){
        return;
    }
    await users.create({
        username:object.username,
        password:object.password
    })
    res.json({
        msg:"user created!"
    })

});
app.get("/me",authmiddleware,(req,res)=>{
    res.json({
        username:req.username
    })
})
app.post("/todo",authmiddleware,async (req,res)=>{
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(404).json({
            msg:"Wrong inputs"
        });
        return;
    }
    const username=req.username;
    const todo=await todos.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    }); 
    await users.updateOne({username:username},{
        "$push":{
            todo:todo
        }
    })
    res.json({
        msg:"Todo created!"
    })
});

app.get("/todo",authmiddleware,async (req,res)=>{
    const username=req.username;
    let todos=await users.find({username:username},{"todo":1,"_id":0});
    todos = todos.map(entry => entry.todo);
    res.json({
        todos
    });
})

app.put("/completed", authmiddleware, async (req, res) => {
    try {
      const todoId = req.body._id;
      const username = req.username;
  
      const updateResult = await users.findOneAndUpdate(
        { "username": username, "todo._id": todoId },
        { $set: { "todo.$.completed": true } },
        { new: true } 
      );
  
      if (!updateResult) {
        return res.status(404).json({ msg: "Todo not found" });
      }
  
      res.json({ msg: "Completed" });
    } catch (error) {
      console.error('Error marking todo as completed:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
app.listen(3000);