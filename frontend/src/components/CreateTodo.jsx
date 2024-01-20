import { Card } from "@mui/material";
import { shadows } from '@mui/system';
import { useState, useEffect } from "react";
import { Todos } from "./Todos";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [Todosdata, setTodosdata] = useState([]);

    const fetchTodos = () => {
        fetch("http://localhost:3000/todo", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            setTodosdata(data.todos);
        })
        .catch((error) => {
            console.error("Error fetching todos:", error);
        });
    };

    const addTodo = () => {
        fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const json = await res.json();
            alert("Todo Added!");
            fetchTodos(); 
            setTitle("");
            setdescription("");
        })
        .catch((error) => {
            console.error("Error adding todo:", error);
        });
    };

    useEffect(() => {
        fetchTodos(); 
    }, []);

    return (
        <div>
            <center>
                <Card variant="outlined" style={{ width: "400px", padding: "20px", backgroundColor: "#EEE8FD", marginTop: "110px" }}  sx={{ boxShadow: 3 }}>
                    <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} /><br />
                    <input type="text" value={description} placeholder="Description" onChange={(e) => setdescription(e.target.value)} /><br />
                    <button style={{ marginTop: "20px" }} onClick={addTodo}>Add a Todo</button>
                </Card>
                <div>
                    <Todos todos={Todosdata} fetchTodos={fetchTodos} />
                </div>
            </center>
        </div>
    );
}
