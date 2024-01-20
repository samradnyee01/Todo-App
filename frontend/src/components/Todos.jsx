import { Card } from "@mui/material";
import { shadows } from '@mui/system';
export function Todos({todos,fetchTodos}){
    console.log(todos)
    if(todos.length){
     return <div>
        {todos[0].map(todo=>{
            return <div>
                <center>
                <Card variant="outlined" style={{ width: "300px", padding: "20px", backgroundColor: "#C8FEFD", marginTop: "110px" }} sx={{ boxShadow: 3 }}>
                <h4><i>{todo.title}</i></h4>
                <h4><i>{todo.description}</i></h4>
                <button onClick={()=>{
                    fetch("http://localhost:3000/completed",{
                        method:"PUT",
                        body: JSON.stringify({
                            _id:todo._id
                        }),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": localStorage.getItem("token")
                        }
                    })
                    .then(()=>{
                        fetchTodos();
                    })
                }}>{todo.completed==true?"Completed":"Mark as Complete"}</button>
                </Card>
                </center>
            </div>
        })}
        
       </div>
    }
}