const zod=require("zod");

const createTodo = zod.object({
    title:zod.string().min(1),
    description:zod.string().min(1),
});

const updateTodo = zod.object({
    id:zod.string().min(1),
    username:zod.string().email()
});
const loginSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(1)
});
module.exports={
    createTodo:createTodo,
    updateTodo:updateTodo,
    loginSchema:loginSchema
}