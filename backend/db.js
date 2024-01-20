require('dotenv').config()
const mongoose=require("mongoose");

mongoose.connect(process.env.DB_URL);
const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean,
});
const userSchema=mongoose.Schema({
    username:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    todo:[todoSchema]
})
const todos=mongoose.model('todos',todoSchema);
const users=mongoose.model('users',userSchema);
module.exports={
    todos,
    users
}